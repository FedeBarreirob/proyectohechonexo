import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { PerfilBasico } from '../../../interfaces/perfiles/perfil-basico';
import { InfoSesion } from '../../../interfaces/security/info-sesion';
import { EntidadAlg } from '../../../interfaces/perfiles/entidad-alg';
import { CuentaAlgService } from '../../../services/observers/cuentas-alg/cuenta-alg.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-combo-cuenta',
	templateUrl: './combo-cuenta.component.html',
	styleUrls: ['./combo-cuenta.component.css']
})
export class ComboCuentaComponent implements OnInit, OnDestroy {

	@Output()
	change: EventEmitter<EntidadAlg> = new EventEmitter<EntidadAlg>();

	@Input()
	disabled: boolean = false;

	@Input()
	colorIndicador: string = "#666666";

	@Input()
	sizeArrow: string = '24px';

	@Input()
	showAvatar: boolean = true;

	perfilBasico: PerfilBasico;
	cuentaSeleccionada: EntidadAlg;
	cargando: boolean = false;
	codigo: string;
	destroy$: Subject<any> = new Subject<any>();

	constructor(
		private authenticationService: AuthenticationService,
		private cuentaAlgService: CuentaAlgService
	) { }

	ngOnInit() {
		this.authenticationService.perfilActivo$
			.pipe(takeUntil(this.destroy$))
			.subscribe(
				perfil => {
					this.perfilBasico = perfil;
					this.seleccionarUltimaEntidad();
				});

		this.authenticationService.setPerfilActivo(this.authenticationService.perfilUsuarioSeleccionado());
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.unsubscribe();
	}

	// funcion encargada de capturar la cuenta seleccionada
	seleccionar(cuentaVinculada?: EntidadAlg) {
		this.cuentaSeleccionada = cuentaVinculada;
		this.codigo = (cuentaVinculada) ? cuentaVinculada.id.codigo : null;
		this.change.emit(cuentaVinculada);
		this.cuentaAlgService.notificarSeleccion(cuentaVinculada);
		this.actualizarEntidadPorDefecto();
	}

	// funcion encargada de seleccionar la ultima cuenta que el usuario utilizo
	seleccionarUltimaEntidad() {
		if (this.perfilBasico && this.cargando == false) {

			this.cargando = true;

			this.authenticationService.informacionDeSesion(this.perfilBasico.informacionPersonal.id)
				.pipe(takeUntil(this.destroy$))
				.subscribe(
					respuesta => {
						if (respuesta.exito) {
							let infoSesion: InfoSesion = respuesta.datos;
							this.cuentaSeleccionada = this.cuentaAlgCompleto(infoSesion.entidadCodigo);
							this.cuentaAlgService.notificarSeleccion(this.cuentaSeleccionada);
							this.change.emit(this.cuentaSeleccionada);
							this.codigo = (this.cuentaSeleccionada) ? this.cuentaSeleccionada.id.codigo : null;
						}

						this.cargando = false;
					},
					() => {
						this.cargando = false;
					}
				);
		}
	}

	// funcion encargada de actualizar la entidad por defecto
	actualizarEntidadPorDefecto() {
		if (this.perfilBasico && this.cargando == false) {
			this.cargando = true;

			let infoSesion: InfoSesion = {
				entidadCodigo: this.cuentaSeleccionada.id.codigo,
				perfil: this.perfilBasico.informacionPersonal
			};

			this.authenticationService.guardarInformacionDeSesion(infoSesion)
				.pipe(takeUntil(this.destroy$))
				.subscribe(
					() => {
						this.cargando = false;
					},
					() => {
						this.cargando = false;
					});
		}
	}

	// funcion que a partir de un codigo de entidad devuelve todos los datos de la cuenta alg
	// buscando en el perfil seleccionado
	private cuentaAlgCompleto(cuentaVinculada?: string): EntidadAlg {
		if (cuentaVinculada && this.perfilBasico && this.perfilBasico.entidadCodigos && this.perfilBasico.entidadCodigos.length != 0) {
			return this.perfilBasico.entidadCodigos.find(unaEntidad =>
				unaEntidad.id.codigo === cuentaVinculada);
		} else {
			return null;
		}
	}
}
