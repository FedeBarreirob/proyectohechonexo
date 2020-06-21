import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TerceroBasico } from '../../interfaces/acceso-terceros/tercero-basico';
import { ResponseServicio } from '../../interfaces/varios/response-servicio';
import { environment } from '../../../environments/environment';
import { FiltroGenericoListaConFiltroId } from '../../interfaces/varios/filtro-generico-lista-con-filtroid';
import { BajaTercero } from '../../interfaces/acceso-terceros/baja-tercero';

@Injectable({
	providedIn: 'root'
})
export class TercerosService {

	private urlSeguridadTerceroRegistrar = `${environment.hostSeguridad}/terceros/registrar`;
	private urlSeguridadTerceroListar = `${environment.hostSeguridad}/terceros/lista`;
	private urlSeguridadTerceroModificar = `${environment.hostSeguridad}/terceros/modificar`;
	private urlSeguridadTerceroDarDeBaja = `${environment.hostSeguridad}/terceros/darDeBaja`;
	private urlSeguridadTerceroEliminar = `${environment.hostSeguridad}/terceros`;

	constructor(
		private http: HttpClient
	) { }

	// funcion encargada de registrar un nuevo acceso a tercero
	registrarNuevo(nuevoAccesoTercero: TerceroBasico) {

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		};

		let nuevoAccesoTerceroJson = JSON.stringify(nuevoAccesoTercero);

		return this.http.post<ResponseServicio>(
			this.urlSeguridadTerceroRegistrar, nuevoAccesoTerceroJson, httpOptions);
	}

	// funcion que devuelve un listado paginado
	listadoPaginado(filtro: FiltroGenericoListaConFiltroId) {

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		};

		let filtroJson = JSON.stringify(filtro);

		return this.http.post<ResponseServicio>(
			this.urlSeguridadTerceroListar, filtroJson, httpOptions);
	}

	// funcion encargada de actualizar la informacion de un acceso a tercero existente
	actualizar(accesoTercero: TerceroBasico) {

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		};

		let accesoTerceroJson = JSON.stringify(accesoTercero);

		return this.http.post<ResponseServicio>(
			this.urlSeguridadTerceroModificar, accesoTerceroJson, httpOptions);
	}

	// funcion encargada de dar de baja un tercero
	darDeBajaTercero(terceroId: number, baja: boolean) {

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		};

		let bajaTercero: BajaTercero = {
			terceroId: terceroId,
			baja: baja
		};

		return this.http.put<ResponseServicio>(
			this.urlSeguridadTerceroDarDeBaja, bajaTercero, httpOptions);
	}

	// funcion encargada de eliminar un terceri
	eliminarTercero(terceroId: number) {

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		};

		let urlDelete = `${this.urlSeguridadTerceroEliminar}/${terceroId}`;
		return this.http.delete<ResponseServicio>(urlDelete, httpOptions);
	}
}
