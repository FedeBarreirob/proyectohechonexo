import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificacionesService } from '../../../services/notificaciones/notificaciones.service';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { UserAuth } from '../../../models/security/user';
import { EstadoNotificaciones } from '../../../enums/estado-notificaciones.enum';
import { PerfilBasico } from '../../../interfaces/perfiles/perfil-basico';

@Component({
	selector: 'app-acceso-buzon',
	templateUrl: './acceso-buzon.component.html',
	styleUrls: ['./acceso-buzon.component.css']
})
export class AccesoBuzonComponent implements OnInit {

	constructor(
		private router: Router,
		private notificacionService: NotificacionesService,
		private authenticationService: AuthenticationService
	) { }

	mensajesNuevos = 0;
	public perfilBasico: PerfilBasico;

	ngOnInit() {
		this.authenticationService.perfilActivo$.subscribe(
			perfil => {
				this.perfilBasico = perfil;
				this.actualizarIndicador();
			});

		this.notificacionService.huboCambiosEstadoMensajes$.subscribe(respuesta => this.actualizarIndicador());

		this.actualizarIndicador();
	}

	// funcion encargada de redirigir al buzon
	irAlBuzon() {
		this.router.navigate(["/buzon"]);
	}

	// funcion encargada de actualizar el indicador de mensajes no leidos
	actualizarIndicador() {
		this.mensajesNuevos = 0;

		let perfil = null;
		if (this.perfilBasico) {
			perfil = this.perfilBasico;
		} else {
			perfil = this.authenticationService.perfilUsuarioSeleccionado();
		}

		let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();
		if (usuarioLogueado != null && perfil != null) {

			this.notificacionService.cantidadMensajesEnEstadoIndicado(
				perfil.informacionPersonal.id,
				EstadoNotificaciones.NO_LEIDO)
				.subscribe(respuesta => {

					if (respuesta.exito) {
						this.mensajesNuevos = respuesta.datos;
					}

				}, error => console.log(error));
		}
	}
}
