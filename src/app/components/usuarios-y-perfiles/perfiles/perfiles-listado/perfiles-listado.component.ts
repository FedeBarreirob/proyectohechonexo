import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent, MatSlideToggleChange, MatSnackBar } from '@angular/material';
import { PerfilesEdicionComponent } from '../perfiles-edicion/perfiles-edicion.component';
import { ListadoPaginado } from '../../../../interfaces/varios/listado-paginado';
import { PerfilesService } from '../../../../services/perfiles/perfiles.service';
import { FiltroGenericoLista } from '../../../../interfaces/varios/filtro-generico-lista';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { UserAuth } from '../../../../models/security/user';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { ModalCambioPasswordComponent } from '../../modal-cambio-password/modal-cambio-password.component';

@Component({
	selector: 'app-perfiles-listado',
	templateUrl: './perfiles-listado.component.html',
	styleUrls: ['./perfiles-listado.component.css']
})
export class PerfilesListadoComponent implements OnInit {

	public listaPaginada: ListadoPaginado = {
		listado: [],
		cantidadTotalRegistros: 0,
		cantidadPorPagina: 0,
		paginaActual: 0
	};
	public cargando: boolean;
	private usuarioLogueado: UserAuth;
	public filtro: FiltroGenericoLista = {
		filtro: "",
		numeroPagina: 1,
		cantPorPagina: 25
	};

	// paginacion
	pageEvent: PageEvent;
	pageSizeOptions: number[] = [5, 10, 25, 100];

	constructor(
		private authenticationService: AuthenticationService,
		private dialog: MatDialog,
		private perfilService: PerfilesService,
		private snackBar: MatSnackBar
	) {
		this.usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();
	}

	ngOnInit() {
		this.cargando = false;
	}

	// despliega el formulario para crear un nuevo perfil
	nuevoPerfil() {
		this.dialog.open(PerfilesEdicionComponent);
	}

	// funcion que muestra el dialogo de edicion 
	verEditar(perfil: PerfilBasico) {
		const dialogRef = this.dialog.open(PerfilesEdicionComponent, { data: perfil });

		dialogRef.afterClosed().subscribe(
			data => this.cargarListado(this.pageEvent)
		);
	}

	// lista los perfiles registrados en el sistema
	cargarListado(event?: PageEvent) {
		this.cargando = true;

		if (event != null) {
			this.filtro.numeroPagina = event.pageIndex + 1;
			this.filtro.cantPorPagina = event.pageSize;
		}

		this.perfilService.listadoPaginado(this.filtro).subscribe(
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

	// funcion encargada de habilitar deshabilitar un perfil dado
	habilitacion(perfil: PerfilBasico, $event: MatSlideToggleChange) {
		this.perfilService.darDeBajaPerfil(
			perfil.informacionPersonal.id,
			!$event.checked
		).subscribe(
			respuesta => {
				if (respuesta.exito == true) {
					perfil.credencial.baja = !$event.checked;
				} else {
					this.cargarListado(this.pageEvent);
				}

				this.openSnackBar(respuesta.mensaje, "Habilitación/Baja Perfil");
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

	// funcion encargada de eliminar un perfil dado
	eliminar(perfil: PerfilBasico) {

		let mensaje = `¿Está seguro de borrar el perfil de ${perfil.credencial.username}?`;

		if (confirm(mensaje)) {

			this.perfilService.eliminarPerfil(
				perfil.informacionPersonal.id
			).subscribe(
				respuesta => {
					if (respuesta.exito == true) {
						this.cargarListado(this.pageEvent);
					}

					this.openSnackBar(respuesta.mensaje, "Eliminación de Perfil");
				},
				error => console.log(error)
			);
		}
	}

	// funcion que muestra el dialogo de cambio de password
	cambiarPassword(perfil: PerfilBasico) {
		const dialogRef = this.dialog.open(ModalCambioPasswordComponent, { data: perfil.credencial.username });

		dialogRef.afterClosed().subscribe(
			data => this.cargarListado(this.pageEvent)
		);
	}
}
