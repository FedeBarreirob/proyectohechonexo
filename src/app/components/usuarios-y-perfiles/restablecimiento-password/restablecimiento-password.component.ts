import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { NuevoPassword } from '../../../interfaces/security/nuevo-password';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-restablecimiento-password',
	templateUrl: './restablecimiento-password.component.html',
	styleUrls: ['./restablecimiento-password.component.css']
})
export class RestablecimientoPasswordComponent implements OnInit {

	token: string;
	frmRecup: FormGroup;
	cargando: boolean = false;
	passwordActualizado: boolean = false;
	cargando$: Subject<boolean> = new Subject<boolean>();

	constructor(
		private activatedRouter: ActivatedRoute,
		private router: Router,
		private formBuilder: FormBuilder,
		private snackBar: MatSnackBar,
		private authenticationService: AuthenticationService
	) {
		this.activatedRouter.params.subscribe(params => {
			if (params.token) {
				this.token = params.token;
			} else {
				this.token = null;
			}
		});
	}

	ngOnInit() {
		this.frmRecup = this.formBuilder.group({
			password: [''],
			confirmacionPassword: ['']
		});
	}

	// funcion encargada de actualizar la contrasena
	guardar() {
		if (this.cargando == false) {
			this.cargando = true;
			this.cargando$.next(true);

			let nuevoPassword: NuevoPassword = {
				password: this.frmRecup.value.password,
				passwordConfirmacion: this.frmRecup.value.confirmacionPassword
			};

			this.authenticationService.restablecerPassword(nuevoPassword, this.token).subscribe(
				respuesta => {

					if (respuesta.exito) {
						this.passwordActualizado = true;
					}

					this.openSnackBar(respuesta.mensaje);
					this.cargando = false;
					this.cargando$.next(false);
					console.log(this.passwordActualizado);
				},
				error => {
					console.log(error);
					this.cargando = false;
					this.cargando$.next(false);
				}
			);
		}
	}

	// funcion encargada de volver al login
	volver() {
		this.router.navigate(['login']);
	}

	// abre una notificacion
	openSnackBar(message: string) {
		this.snackBar.open(message, null, {
			duration: 3000,
		});
	}
}
