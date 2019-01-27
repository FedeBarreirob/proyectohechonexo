import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PerfilBasico } from '../../../interfaces/perfiles/perfil-basico';
import { PerfilesService } from '../../../services/perfiles/perfiles.service';
import { UserAuth } from '../../../models/security/user';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { FiltroGenericoLista } from '../../../interfaces/varios/filtro-generico-lista';
import { debounceTime, tap } from 'rxjs/operators';

@Component({
	selector: 'app-selector-cuentas',
	templateUrl: './selector-cuentas.component.html',
	styleUrls: ['./selector-cuentas.component.css']
})
export class SelectorCuentasComponent implements OnInit {

	private usuarioLogueado: UserAuth;
	isLoading = false;

	// busqueda de perfiles
	public buscadorPerfiles: FormControl = new FormControl();
	public listadoPerfiles = <any>[];
	public perfilSeleccionado: PerfilBasico = null;

	constructor(
		private perfilService: PerfilesService,
		private authenticationService: AuthenticationService
	) {
		this.usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();
	}

	ngOnInit() {
		this.buscadorPerfiles.valueChanges
			.pipe(
				debounceTime(500),
				tap(() => {this.isLoading = true; this.listadoPerfiles = []})
			)
			.subscribe(
				termino => {

					if (termino != '' && !(<PerfilBasico>termino instanceof Object)) {

						let filtro = this.filtroSegunTermino(termino);

						this.perfilService.listadoPaginado(filtro, this.usuarioLogueado.token).subscribe(
							respuesta => {
								if (respuesta.exito == true) {
									this.listadoPerfiles = respuesta.datos.listado;
								} else {
									this.listadoPerfiles = [];
								}

								this.isLoading = false;
							}
						)
					}
				}
			);
	}

	// funcion encargada de armar el filtro a partir del termino ingresado
	filtroSegunTermino(termino: any): FiltroGenericoLista {
		try {
			return {
				filtro: termino.valueOf(),
				numeroPagina: 1,
				cantPorPagina: 10
			};
		} catch (e) {
			return {
				filtro: "",
				numeroPagina: 1,
				cantPorPagina: 10
			};
		}
	}

	// funcion encargada de limpiar la seleccion
	limpiarSeleccionSiVacio() {
		if (this.buscadorPerfiles.value == "") {
			this.limpiarPerfilSeleccionado();
		}
	}

	// limpia la entrada de texto y el perfil seleccionado
	private limpiarPerfilSeleccionado() {
		this.buscadorPerfiles.reset();
		this.perfilSeleccionado = null;
	}

	// funcion encargada de obtener el texto a mostrar cuando se seleccione un perfil
	displayPerfil(perfil: PerfilBasico) {
		if (perfil) {
			return perfil.informacionPersonal.nombre !== null && perfil.informacionPersonal.nombre !== "" ? perfil.informacionPersonal.nombre : perfil.credencial.username;
		} else {
			return '';
		}
	}

	// funcion encargada de capturar el perfil seleccionado
	seleccionarPerfil(perfil: PerfilBasico) {
		if (!this.isLoading) {
			this.perfilSeleccionado = perfil;
		}
	}
}
