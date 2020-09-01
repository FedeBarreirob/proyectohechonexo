import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { TercerosService } from '../../../../services/acceso-terceros/terceros.service';
import { AccesoTercerosEdicionComponent } from '../acceso-terceros-edicion/acceso-terceros-edicion.component';
import { TerceroBasico } from '../../../../interfaces/acceso-terceros/tercero-basico';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-acceso-terceros',
	templateUrl: './acceso-terceros.component.html',
	styleUrls: ['./acceso-terceros.component.css']
})
export class AccesoTercerosComponent implements OnInit {

	observerListadoMovil$: Subject<void> = new Subject<void>();

	constructor(
		private dialog: MatDialog,
		private snackBar: MatSnackBar,
		private terceroService: TercerosService,
		private dialogRef: MatDialogRef<AccesoTercerosComponent>
	) { }

	ngOnInit() { }

	// despliega el formulario para crear un nuevo acceso a tercero
	nuevoAccesoATercero() {
		let dialorRef = this.dialog.open(AccesoTercerosEdicionComponent, {
			maxWidth: '100vw',
			maxHeight: '100vh',
			height: '100%',
			width: '100%',
			panelClass: 'modal-sin-padding'
		});

		dialorRef.afterClosed().subscribe(
			() => this.observerListadoMovil$.next()
		);
	}

	// funcion que muestra el dialogo de edicion 
	verEditar(tercero: TerceroBasico) {
		const dialogRef = this.dialog.open(AccesoTercerosEdicionComponent, {
			data: tercero, maxWidth: '100vw',
			maxHeight: '100vh',
			height: '100%',
			width: '100%',
			panelClass: 'modal-sin-padding'
		});

		dialogRef.afterClosed().subscribe(
			() => this.observerListadoMovil$.next()
		);
	}

	// funcion encargada de habilitar deshabilitar un tercero dado
	habilitacion(tercero: TerceroBasico) {
		this.terceroService.darDeBajaTercero(
			tercero.id,
			tercero.credencial.baja
		).subscribe(
			respuesta => {
				if (respuesta.exito == false) {
					this.observerListadoMovil$.next();
				}

				this.openSnackBar(respuesta.mensaje);
			},
			error => console.log(error)
		);

	}

	// abre una notificacion
	openSnackBar(message: string) {
		this.snackBar.open(message, null, {
			duration: 2000,
		});
	}

	/**
	 * Cierra el modal
	 */
	salir() {
		this.dialogRef.close();
	}
}
