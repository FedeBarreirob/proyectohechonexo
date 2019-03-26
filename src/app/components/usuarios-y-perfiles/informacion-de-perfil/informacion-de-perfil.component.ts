import { Component, OnInit } from '@angular/core';
import { PerfilesService } from '../../../services/perfiles/perfiles.service';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { PerfilBasico } from '../../../interfaces/perfiles/perfil-basico';
import { UserAuth } from '../../../models/security/user';
import { EntidadAlg } from '../../../interfaces/perfiles/entidad-alg';
import { MatSnackBar } from '@angular/material';
import { PerfilBasicoInfoPersonal } from '../../../interfaces/perfiles/perfil-basico-informacion-personal';

@Component({
	selector: 'app-informacion-de-perfil',
	templateUrl: './informacion-de-perfil.component.html',
	styleUrls: ['./informacion-de-perfil.component.css']
})
export class InformacionDePerfilComponent implements OnInit {

	public cargando: boolean;

	public cuenta: string = "";
	public perfilBasico: PerfilBasico;
	public detalleCuenta: EntidadAlg;

	unidadMedidaPesoSeleccionado: string;

	constructor(
		private authenticationService: AuthenticationService,
		private perfilesService: PerfilesService,
		private snackBar: MatSnackBar
	) { }

	ngOnInit() {
		this.cargando = false;

		this.authenticationService.perfilActivo$.subscribe(
			perfil => {
				this.perfilBasico = perfil;
				this.unidadMedidaPesoSeleccionado = this.perfilBasico.informacionPersonal.unidadMedidaPeso;
			});

		this.unidadMedidaPesoSeleccionado = this.perfilBasico.informacionPersonal.unidadMedidaPeso;
	}

	// funcion que ejecuta el proceso de carga de la informacion
	cargarDetalle() {
		this.cargando = true;

		let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();

		if (usuarioLogueado != null) {
			this.perfilesService.datosCuenta(this.cuenta, usuarioLogueado.token).subscribe(
				datos => {
					if (datos) {
						this.detalleCuenta = datos;
					} else {
						this.detalleCuenta = null;
					}
					this.cargando = false;
				},
				error => {
					console.log(error);
					this.cargando = false;
				}
			);
		}
	}

	// funcion encargada de capturar el valor de la cuenta
	seleccionarCuenta(cuentaSeleccionada?: string) {
		this.cuenta = cuentaSeleccionada;
		this.cargarDetalle();
	}

	// abre una notificacion
	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			duration: 3000,
		});
	}

	// funcion encargada de actualizar la unidad de medida
	actualizarUnidadDeMedidaPeso(nuevaUnidad: string) {
		this.cargando = true;

		let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();

		if (usuarioLogueado != null) {

			let perfilBasicoInfoPersonal: PerfilBasicoInfoPersonal = {
				id: this.perfilBasico.informacionPersonal.id,
				unidadMedidaPeso: nuevaUnidad
			};

			this.perfilesService.actualizarUnidadMedidaPeso(perfilBasicoInfoPersonal, usuarioLogueado.token)
				.subscribe(
					respuesta => {
						if (respuesta.exito) {
							this.unidadMedidaPesoSeleccionado = nuevaUnidad;

							let mensaje = `${respuesta.mensaje} - Deberá salir y volver a entrar al sistema para que los cambios surtan efecto.`;

							this.openSnackBar(mensaje, "");
						} else {
							this.openSnackBar(respuesta.mensaje, "Error");
						}

						this.cargando = false;
					},
					error => {
						console.log(error);
						this.openSnackBar("Error al intentar actualizar la unidad de medida.", "Error");
						this.cargando = false;
					}
				);
		} else {
			this.cargando = false;
		}

	}
}
