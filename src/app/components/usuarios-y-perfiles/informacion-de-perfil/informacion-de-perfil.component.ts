import { Component, OnInit } from '@angular/core';
import { PerfilesService } from 'src/app/services/perfiles/perfiles.service';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { PerfilBasico } from 'src/app/interfaces/perfiles/perfil-basico';
import { UserAuth } from 'src/app/models/security/user';
import { EntidadAlg } from 'src/app/interfaces/perfiles/entidad-alg';

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

	constructor(
		private authenticationService: AuthenticationService,
		private perfilesService: PerfilesService
	) { }

	ngOnInit() {
		this.cargando = false;

		this.authenticationService.perfilActivo$.subscribe(
			perfil => this.perfilBasico = perfil);
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
					console.log(this.detalleCuenta);
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
}
