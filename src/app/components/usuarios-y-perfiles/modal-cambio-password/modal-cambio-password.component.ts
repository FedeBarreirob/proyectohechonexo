import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { CambioPasswordUsuario } from '../../../interfaces/security/cambio-password-usuario';

@Component({
	selector: 'app-modal-cambio-password',
	templateUrl: './modal-cambio-password.component.html',
	styleUrls: ['./modal-cambio-password.component.css']
})
export class ModalCambioPasswordComponent implements OnInit {

	public guardando: boolean = false;
	public formDatosAccesoGroup: FormGroup;
	public passwordActualizado: boolean = false;

	constructor(
		private authenticationService: AuthenticationService,
		private formBuilder: FormBuilder,
		private snackBar: MatSnackBar,
		@Inject(MAT_DIALOG_DATA) public data: string
	) { }

	ngOnInit() {
		this.formDatosAccesoGroup = this.formBuilder.group({
			password: [''],
			passwordConfirmacion: ['']
		});
	}

	// abre una notificacion
	openSnackBar(message: string) {
		this.snackBar.open(message, "Cambio de contraseña", {
			duration: 3000,
		});
	}

	
	// funcion encargada de enviar los datos para su persistencia
	guardar() {
		if (this.guardando == false) {
			this.guardando = true;

			let cambioPassword: CambioPasswordUsuario = {
				nombreUsuario: this.data,
				nuevoPasswordDTO: {
					password: this.formDatosAccesoGroup.value.password,
					passwordConfirmacion: this.formDatosAccesoGroup.value.passwordConfirmacion
				}
			};

			this.authenticationService.restablecerPasswordPorNombreDeUsuario(cambioPassword).subscribe(
				respuesta => {

					if (respuesta.exito) {
						this.passwordActualizado = true;
					}

					this.openSnackBar(respuesta.mensaje);
					this.guardando = false;
				},
				error => {
					console.log(error);
					this.guardando = false;
				}
			);
		}
	}
}
