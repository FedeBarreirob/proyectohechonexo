import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/security/authentication.service';
import { UserAuth } from '../models/security/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  frmLogin: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  mensaje = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.frmLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    const frm = this.frmLogin.value;
    this.authenticationService.login(frm.username, frm.password).subscribe(
      respuesta => {

        if (respuesta && respuesta.exito == true) {
          let user = new UserAuth();
          user.username = frm.username;
          user.token = respuesta.token;
          localStorage.setItem('currentUser', JSON.stringify(user));

          console.log(user);

          this.router.navigate([this.returnUrl]);
        } else {
          this.mensaje = (respuesta.mensaje) ? respuesta.mensaje : 'Acceso denegado';
        }
      },
      error => {
        this.error = error;
        this.loading = false;
      });
  }
}
