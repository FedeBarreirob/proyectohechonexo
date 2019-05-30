import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TerceroBasico } from '../../../../interfaces/acceso-terceros/tercero-basico';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TercerosService } from '../../../../services/acceso-terceros/terceros.service';
import { TerceroBasicoCredencial } from '../../../../interfaces/acceso-terceros/tercero-credencial';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-acceso-terceros-edicion',
	templateUrl: './acceso-terceros-edicion.component.html',
	styleUrls: ['./acceso-terceros-edicion.component.css']
})
export class AccesoTercerosEdicionComponent implements OnInit {

	public guardando: boolean = false;
	guardando$: Subject<boolean> = new Subject<boolean>();
	public formGroup: FormGroup;
	public esRegistroNuevo: boolean;
	public titulo: string;

	private terceroBasico: TerceroBasico;

	// subtipos para los perfiles
	public subtiposTerceros: Array<string> = ['CONTADOR', 'COLABORADOR', 'OTRO'];

	constructor(
		private authenticationService: AuthenticationService,
		private formBuilder: FormBuilder,
		private snackBar: MatSnackBar,
		private terceroService: TercerosService,
		private dialogRef: MatDialogRef<AccesoTercerosEdicionComponent>,
		@Inject(MAT_DIALOG_DATA) public data: TerceroBasico
	) {
	}

	ngOnInit() {
		// determinar si es un registro nuevo o una actualizacion de acceso a tercero
		this.esRegistroNuevo = this.data == null ? true : false;
		this.titulo = this.esRegistroNuevo ? "Nuevo acceso a tercero" : "Ver/Editar acceso a tercero";

		// credenciales
		if (this.data != null) {
			this.formGroup = this.formBuilder.group({
				username: [this.data.credencial.username],
				password: [''],
				passwordConfirmacion: [''],
				subtipo: [this.subtiposTerceros.filter(x => x === (this.data.subtipo != null ? this.data.subtipo : null))[0]],
				id: [this.data.id],
				descripcion: [this.data.descripcion]
			});
		} else {
			this.formGroup = this.formBuilder.group({
				username: [''],
				password: [''],
				passwordConfirmacion: [''],
				subtipo: [null],
				id: [null],
				descripcion: ['']
			});
		}
	}

	// funcion encargada de enviar los datos para su persistencia
	guardar() {
		if (!this.guardando) {
			this.guardando = true;
			this.guardando$.next(true);

			let datosAcceso: TerceroBasicoCredencial = this.formGroup.getRawValue();
			let informacionAdicional: TerceroBasico = this.formGroup.getRawValue();
			let subtipo: string = this.formGroup.value.subtipo;

			this.terceroBasico = {
				id: informacionAdicional.id,
				credencial: datosAcceso,
				perfilId: this.authenticationService.perfilUsuarioLogueado().informacionPersonal.id,
				descripcion: informacionAdicional.descripcion,
				subtipo: subtipo
			};

			if (this.esRegistroNuevo) {
				this.guardarNuevo();
			} else {
				this.guardarModificar();
			}
		} else {
			this.openSnackBar("Existe un proceso de registro ejecutándose.");
		}
	}

	// funcion encargada de guardar un nuevo acceso a terceros
	guardarNuevo() {
		this.terceroService.registrarNuevo(this.terceroBasico)
			.subscribe(respuesta => {
				this.guardando = false;
				this.guardando$.next(false);

				if (respuesta && respuesta.exito == false) {
					this.openSnackBar(respuesta.mensaje);
				} else {
					this.openSnackBar(respuesta.mensaje);
					this.dialogRef.close();
				}

			}, error => {
				this.guardando = false;
				this.guardando$.next(false);

				this.openSnackBar("Error al intentar registrar el acceso a terceros");
				console.log(error);
			});
	}

	// funcion encargada de actualizar un acceso a terceros
	guardarModificar() {
		this.terceroService.actualizar(this.terceroBasico)
			.subscribe(respuesta => {

				this.guardando = false;
				this.guardando$.next(false);

				if (respuesta && respuesta.exito == false) {
					this.openSnackBar(respuesta.mensaje);
				} else {
					this.openSnackBar(respuesta.mensaje);
					this.dialogRef.close();
				}

			}, error => {
				this.guardando = false;
				this.guardando$.next(false);

				this.openSnackBar("Error al intentar actualizar el acceso a terceros");
				console.log(error);
			});
	}

	// abre una notificacion
	openSnackBar(message: string) {
		this.snackBar.open(message, null, {
			duration: 2000,
		});
	}

	/**
	 * Función que borrar el usuario actual
	 */
	borrar() {
		let mensaje = `¿Está seguro de borrar el tercero ${this.data.credencial.username}?`;

		if (confirm(mensaje)) {

			this.guardando$.next(true);

			this.terceroService.eliminarTercero(
				this.data.id
			).subscribe(
				respuesta => {
					this.guardando$.next(false);
					this.openSnackBar(respuesta.mensaje);
					if (respuesta.exito == true) {
						this.dialogRef.close();
					}
				},
				error => {
					console.log(error);
					this.guardando$.next(false);
				}
			);
		}
	}

	/**
	 * Cierra el modal sin efectuar cambios
	 */
	salir() {
		this.dialogRef.close();
	}
}
