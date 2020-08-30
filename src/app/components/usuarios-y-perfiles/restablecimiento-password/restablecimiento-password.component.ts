import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar, ThemePalette } from '@angular/material';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { NuevoPassword } from '../../../interfaces/security/nuevo-password';
import { Subject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
	selector: 'app-restablecimiento-password',
	templateUrl: './restablecimiento-password.component.html',
	styleUrls: ['./restablecimiento-password.component.css']
})
export class RestablecimientoPasswordComponent implements OnInit {

	@Input()
	color: ThemePalette

	token: string;
	frmRecup: FormGroup;
	cargando: boolean = false;
	passwordActualizado: boolean = false;
	cargando$: Subject<boolean> = new Subject<boolean>();
	hidePassword = true;
	hidePasswordd = true;
	esCelular: boolean;

	constructor(
		private activatedRouter: ActivatedRoute,
		private router: Router,
		private formBuilder: FormBuilder,
		private snackBar: MatSnackBar,
		private authenticationService: AuthenticationService,
		private deviceService: DeviceDetectorService
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
		this.esCelular = this.deviceService.isMobile();
		
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
