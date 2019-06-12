import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PerfilBasico } from '../../../interfaces/perfiles/perfil-basico';
import { PerfilesService } from '../../../services/perfiles/perfiles.service';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { FiltroGenericoLista } from '../../../interfaces/varios/filtro-generico-lista';
import { debounceTime, tap, takeUntil } from 'rxjs/operators';
import { isUndefined } from 'util';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-selector-cuentas',
	templateUrl: './selector-cuentas.component.html',
	styleUrls: ['./selector-cuentas.component.css']
})
export class SelectorCuentasComponent implements OnInit, OnDestroy {

	isLoading = false;

	// busqueda de perfiles
	public buscadorPerfiles: FormControl = new FormControl();
	public listadoPerfiles = <any>[];
	public perfilSeleccionado: PerfilBasico = null;
	destroy$: Subject<any> = new Subject<any>();

	constructor(
		private perfilService: PerfilesService,
		private authenticationService: AuthenticationService
	) { }

	ngOnInit() {
		this.buscadorPerfiles.valueChanges
			.pipe(
				debounceTime(500),
				tap(() => { this.isLoading = true; this.listadoPerfiles = [] }),
				takeUntil(this.destroy$)
			)
			.subscribe(
				termino => {

					if (termino != '' && !(<PerfilBasico>termino instanceof Object)) {

						let filtro = this.filtroSegunTermino(termino);

						this.perfilService.listadoPaginado(filtro).subscribe(
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

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.unsubscribe();
	}

	// funcion encargada de armar el filtro a partir del termino ingresado
	filtroSegunTermino(termino: any): FiltroGenericoLista {
		try {
			return {
				filtro: termino.valueOf(),
				numeroPagina: 1,
				cantPorPagina: 10,
				fullData: true
			};
		} catch (e) {
			return {
				filtro: "",
				numeroPagina: 1,
				cantPorPagina: 10,
				fullData: true
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
		this.authenticationService.setPerfilActivo(null);
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

			if (!isUndefined(perfil)) {
				this.authenticationService.setPerfilActivo(perfil);
			} else {
				this.limpiarPerfilSeleccionado();
			}

		} else {
			this.limpiarPerfilSeleccionado();
		}
	}
}
