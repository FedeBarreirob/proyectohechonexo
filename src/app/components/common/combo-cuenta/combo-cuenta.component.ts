import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { PerfilBasico } from '../../../interfaces/perfiles/perfil-basico';
import { UserAuth } from '../../../models/security/user';
import { InfoSesion } from '../../../interfaces/security/info-sesion';

@Component({
	selector: 'app-combo-cuenta',
	templateUrl: './combo-cuenta.component.html',
	styleUrls: ['./combo-cuenta.component.css']
})
export class ComboCuentaComponent implements OnInit {

	@Output()
	change: EventEmitter<string> = new EventEmitter<string>();

	@Input("disabled")
	disabled: boolean;

	perfilBasico: PerfilBasico;
	cuentaSeleccionada: string;
	cargando: boolean = false;

	constructor(
		private authenticationService: AuthenticationService
	) { }

	ngOnInit() {
		this.authenticationService.perfilActivo$.subscribe(
			perfil => {
				this.perfilBasico = perfil;
				this.seleccionarUltimaEntidad();
			});

		this.authenticationService.setPerfilActivo(this.authenticationService.perfilUsuarioSeleccionado());
	}

	// funcion encargada de capturar la cuenta seleccionada
	seleccionar(cuentaVinculada?: string) {
		this.change.emit(cuentaVinculada);
		this.actualizarEntidadPorDefecto();
	}

	// funcion encargada de seleccionar la ultima cuenta que el usuario utilizo
	seleccionarUltimaEntidad() {
		if (this.perfilBasico) {

			this.cargando = true;
			let usuarioLogueado: UserAuth = this.authenticationService.usuarioLogueado();

			if (usuarioLogueado) {
				this.authenticationService.informacionDeSesion(this.perfilBasico.informacionPersonal.id, usuarioLogueado.token)
					.subscribe(
						respuesta => {
							if (respuesta.exito) {
								let infoSesion: InfoSesion = respuesta.datos;
								this.cuentaSeleccionada = infoSesion.entidadCodigo;
								this.change.emit(this.cuentaSeleccionada);
							}

							this.cargando = false;
						},
						error => {
							this.cargando = false;
						}
					);
			} else {
				this.cargando = false;
			}
		}
	}

	// funcion encargada de actualizar la entidad por defecto
	actualizarEntidadPorDefecto() {
		if (this.perfilBasico) {
			this.cargando = true;
			let usuarioLogueado: UserAuth = this.authenticationService.usuarioLogueado();

			if (usuarioLogueado) {
				let infoSesion: InfoSesion = {
					entidadCodigo: this.cuentaSeleccionada,
					perfil: this.perfilBasico.informacionPersonal
				};

				this.authenticationService.guardarInformacionDeSesion(infoSesion, usuarioLogueado.token)
					.subscribe(
						respuesta => {
							this.cargando = false;
						},
						error => {
							this.cargando = false;
						});
			} else {
				this.cargando = false;
			}
		}
	}
}
