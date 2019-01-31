import { Component, OnInit } from '@angular/core';
import { ListadoPaginado } from '../../../../interfaces/varios/listado-paginado';
import { UserAuth } from '../../../../models/security/user';
import { FiltroGenericoListaConFiltroId } from '../../../../interfaces/varios/filtro-generico-lista-con-filtroid';
import { PageEvent, MatDialog, MatSlideToggleChange, MatSnackBar } from '@angular/material';
import { TercerosService } from '../../../../services/acceso-terceros/terceros.service';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { AccesoTercerosEdicionComponent } from '../acceso-terceros-edicion/acceso-terceros-edicion.component';
import { TerceroBasico } from '../../../../interfaces/acceso-terceros/tercero-basico';

@Component({
	selector: 'app-acceso-terceros',
	templateUrl: './acceso-terceros.component.html',
	styleUrls: ['./acceso-terceros.component.css']
})
export class AccesoTercerosComponent implements OnInit {

	public listaPaginada: ListadoPaginado = {
		listado: [],
		cantidadTotalRegistros: 0,
		cantidadPorPagina: 0,
		paginaActual: 0
	};
	public cargando: boolean;
	private usuarioLogueado: UserAuth;
	public filtro: FiltroGenericoListaConFiltroId = {
		filtro: "",
		numeroPagina: 1,
		cantPorPagina: 25,
		filtroId: 0
	};

	// paginacion
	pageEvent: PageEvent;
	pageSizeOptions: number[] = [5, 10, 25, 100];

	constructor(
		private authenticationService: AuthenticationService,
		private dialog: MatDialog,
		private snackBar: MatSnackBar,
		private terceroService: TercerosService
	) {
		this.usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();
	}

	ngOnInit() {
		this.cargando = false;

		// cargar el perfil en el filtro
		let perfil = this.authenticationService.perfilUsuarioLogueado();
		if (perfil != null) {
			this.filtro.filtroId = perfil.informacionPersonal.id;
		}
	}

	// despliega el formulario para crear un nuevo acceso a tercero
	nuevoAccesoATercero() {
		this.dialog.open(AccesoTercerosEdicionComponent);
	}

	// lista los accesos a terceros registrados en el sistema
	cargarListado(event?: PageEvent) {
		this.cargando = true;

		if (event != null) {
			this.filtro.numeroPagina = event.pageIndex + 1;
			this.filtro.cantPorPagina = event.pageSize;
		}

		this.terceroService.listadoPaginado(this.filtro, this.usuarioLogueado.token).subscribe(
			respuesta => {
				this.listaPaginada = <ListadoPaginado>respuesta.datos;
				this.cargando = false;
			},
			error => {
				this.cargando = false;
			}
		);

		return event;
	}

	// funcion que muestra el dialogo de edicion 
	verEditar(tercero: TerceroBasico) {
		const dialogRef = this.dialog.open(AccesoTercerosEdicionComponent, { data: tercero });

		dialogRef.afterClosed().subscribe(
			data => this.cargarListado(this.pageEvent)
		);
	}

	// funcion encargada de habilitar deshabilitar un tercero dado
	habilitacion(tercero: TerceroBasico, $event: MatSlideToggleChange) {
		this.terceroService.darDeBajaTercero(
			tercero.id,
			!$event.checked,
			this.usuarioLogueado.token
		).subscribe(
			respuesta => {
				if (respuesta.exito == true) {
					tercero.credencial.baja = !$event.checked;
				} else {
					this.cargarListado(this.pageEvent);
				}

				this.openSnackBar(respuesta.mensaje, "Habilitación/Baja Tercero");
			},
			error => console.log(error)
		);

	}

	// abre una notificacion
	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			duration: 2000,
		});
	}

	// funcion encargada de eliminar un tercero dado
	eliminar(tercero: TerceroBasico) {

		let mensaje = `¿Está seguro de borrar el tercero ${tercero.credencial.username}?`;

		if (confirm(mensaje)) {

			this.terceroService.eliminarTercero(
				tercero.id,
				this.usuarioLogueado.token
			).subscribe(
				respuesta => {
					if (respuesta.exito == true) {
						this.cargarListado(this.pageEvent);
					}

					this.openSnackBar(respuesta.mensaje, "Eliminación de Tercero");
				},
				error => console.log(error)
			);
		}
	}
}
