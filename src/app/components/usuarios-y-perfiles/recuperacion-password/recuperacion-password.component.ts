import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { SolicitudRecuperacionPassword } from '../../../interfaces/security/solicitud-recuperacion-password';
import { environment } from '../../../../environments/environment';
import { Subject } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ModalEnvioRestablecerPasswordComponent } from '../modal-envio-restablecer-password/modal-envio-restablecer-password.component';

@Component({
	selector: 'app-recuperacion-password',
	templateUrl: './recuperacion-password.component.html',
	styleUrls: ['./recuperacion-password.component.css']
})
export class RecuperacionPasswordComponent implements OnInit {

	frmRecup: FormGroup;
	cargando: boolean = false;
	solicitudEnviada: boolean = false;
	cargando$: Subject<boolean> = new Subject<boolean>();
	esCelular: boolean;
	falloEnvioEmail: boolean = false;

	constructor(
		private dialog: MatDialog,
		private formBuilder: FormBuilder,
		private router: Router,
		private snackBar: MatSnackBar,
		private authenticationService: AuthenticationService,
		private deviceService: DeviceDetectorService
	) { }

	ngOnInit() {
		this.esCelular = this.deviceService.isMobile();
		
		this.frmRecup = this.formBuilder.group({
			email: ['', Validators.email]
		});
	}

	// funcion encargada de ejecutar el proceso de solicitud de link para recuperar la contrasena
	solicitarLink() {
		if (this.cargando == false) {
			this.cargando = true;
			this.cargando$.next(true);
			this.falloEnvioEmail = true;

			let solicitud: SolicitudRecuperacionPassword = {
				email: this.frmRecup.value.email,
				urlCallback: `${environment.baseUrl}/restablecer-password`
			};

			this.authenticationService.solicitudRecuperacionPassword(solicitud).subscribe(
				respuesta => {

					if (respuesta.exito) {
						this.solicitudEnviada = true;

						this.dialog.open(ModalEnvioRestablecerPasswordComponent, {
							maxWidth: '100vw',
							width: '100%',
							maxHeight: '100vh',
							height: '100%',
							panelClass: 'modal-sin-padding'
						});
					}

					this.openSnackBar(respuesta.mensaje);
					this.cargando = false;
					this.cargando$.next(false);
					this.falloEnvioEmail = true;
				},
				error => {
					console.log(error);
					this.cargando = false;
					this.cargando$.next(false);
					this.falloEnvioEmail = true;
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
