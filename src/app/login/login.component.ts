import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/security/authentication.service';
import { UserAuth } from '../models/security/user';
import { PerfilesService } from '../services/perfiles/perfiles.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  frmLogin: FormGroup;
  logueando: boolean = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private perfilService: PerfilesService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.frmLogin = this.formBuilder.group({
      username: [''],
      password: ['']
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    if (!this.logueando) {
      this.logueando = true;
      const frm = this.frmLogin.value;
      this.authenticationService.login(frm.username, frm.password).subscribe(
        respuesta => {
          if (respuesta && respuesta.exito == true) {
            let user = new UserAuth();
            user.username = frm.username;
            user.token = respuesta.token;
            localStorage.setItem('currentUser', JSON.stringify(user));

            this.cargarPerfilLogueado(respuesta.token);

            this.router.navigate([this.returnUrl]);
          } else {
            this.logueando = false;
            this.openSnackBar((respuesta.mensaje) ? respuesta.mensaje : 'Acceso denegado', "Login");
          }
        },
        error => {
          this.logueando = false;
          this.openSnackBar(error, "Login");
        });
    } else {
      this.openSnackBar("Existe un proceso de login ejecutándose.", "Login");
    }
  }

  // funcion encargada de cargar 
  private cargarPerfilLogueado(token: string) {
    this.perfilService.perfilLogueado(token).subscribe(respuesta => {

      if (respuesta && respuesta.exito == true) {
        localStorage.setItem('currentUserPerfil', JSON.stringify(respuesta.datos));
      } else {
        console.log(respuesta);
      }
    }, error => {
      this.openSnackBar("Error al intentar obtener los datos del perfil", "Login");
    });
  }

  // abre una notificacion
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
