import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { SolicitudRecuperacionPassword } from 'src/app/interfaces/security/solicitud-recuperacion-password';

@Component({
	selector: 'app-recuperacion-password',
	templateUrl: './recuperacion-password.component.html',
	styleUrls: ['./recuperacion-password.component.css']
})
export class RecuperacionPasswordComponent implements OnInit {

	frmRecup: FormGroup;
	cargando: boolean = false;
	solicitudEnviada: boolean = false;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private snackBar: MatSnackBar,
		private authenticationService: AuthenticationService,
	) { }

	ngOnInit() {
		this.frmRecup = this.formBuilder.group({
			email: ['', Validators.email]
		});
	}

	// funcion encargada de ejecutar el proceso de solicitud de link para recuperar la contrasena
	solicitarLink() {
		this.cargando = true;

		let solicitud: SolicitudRecuperacionPassword = {
			email: this.frmRecup.value.email,
			urlCallback: `${location.origin}/restablecer-password`
		};

		this.authenticationService.solicitudRecuperacionPassword(solicitud).subscribe(
			respuesta => {

				if (respuesta.exito) {
					this.solicitudEnviada = true;
				}

				this.openSnackBar(respuesta.mensaje);
				this.cargando = false;
			},
			error => {
				console.log(error);
				this.cargando = false;
			}
		);
	}

	// funcion encargada de volver al login
	volver() {
		this.router.navigate(['login']);
	}

	// abre una notificacion
	openSnackBar(message: string) {
		this.snackBar.open(message, "Recuperación de contraseña", {
			duration: 3000,
		});
	}
}
