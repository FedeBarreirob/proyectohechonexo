import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from '../../../services/notificaciones/notificaciones.service';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { PageEvent, MatDialog } from '@angular/material';
import { PerfilBasico } from '../../../interfaces/perfiles/perfil-basico';
import { UserAuth } from '../../../models/security/user';
import { tap } from 'rxjs/operators';
import { ListadoPaginado } from '../../../interfaces/varios/listado-paginado';
import { Notificacion } from '../../../interfaces/notificaciones/notificacion';
import { NotificacionDetalleComponent } from '../notificacion-detalle/notificacion-detalle.component';

@Component({
	selector: 'app-buzon',
	templateUrl: './buzon.component.html',
	styleUrls: ['./buzon.component.css']
})
export class BuzonComponent implements OnInit {

	perfilBasico: PerfilBasico;
	private usuarioLogueado: UserAuth;

	public listaPaginada: ListadoPaginado = {
		listado: [],
		cantidadTotalRegistros: 0,
		cantidadPorPagina: 0,
		paginaActual: 0
	};

	public filtro = {
		numeroPagina: 1,
		cantPorPagina: 25
	};

	cargando: boolean = false;

	// paginacion
	pageEvent: PageEvent;
	pageSizeOptions: number[] = [5, 10, 25, 100];

	constructor(
		private notificacionService: NotificacionesService,
		private authenticationService: AuthenticationService,
		public dialog: MatDialog
	) {
		this.usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();
	}

	ngOnInit() {
		this.authenticationService.perfilActivo$.subscribe(
			perfil => {
				this.perfilBasico = perfil;
				this.cargarListado(this.pageEvent);
			});

		this.cargarListado(this.pageEvent);
	}

	// funcion encargada de cargar el listado de notificaciones
	cargarListado(event?: PageEvent) {

		this.cargando = true;

		let perfil = null;
		if (this.perfilBasico) {
			perfil = this.perfilBasico;
		} else {
			perfil = this.authenticationService.perfilUsuarioSeleccionado();
		}

		if (event != null) {
			this.filtro.numeroPagina = event.pageIndex + 1;
			this.filtro.cantPorPagina = event.pageSize;
		}

		if (this.usuarioLogueado != null) {
			this.notificacionService.listadoNotificaciones(
				perfil.informacionPersonal.id,
				this.filtro.numeroPagina,
				this.filtro.cantPorPagina)
				.subscribe(respuesta => {

					if (respuesta.exito) {
						this.listaPaginada = <ListadoPaginado>respuesta.datos;
					}

					this.cargando = false;
				}, error => { console.log(error); this.cargando = false });
		}

		return event;
	}

	// funcion encargada de limpiar los tags html del cuerpo del mensaje y truncado
	cuerpoMensajePlano(cuerpoOriginal: string) {
		return cuerpoOriginal.replace(/(<([^>]+)>)/ig, "").substring(0, 20) + "...";
	}

	// funcion que muestra el detalle de un mensaje
	verDetalle(notificacion: Notificacion) {
		const dialogRef = this.dialog.open(NotificacionDetalleComponent, {
			data: notificacion
		});

		dialogRef.afterClosed().subscribe(
			data => this.cargarListado(this.pageEvent)
		);
	}
}
