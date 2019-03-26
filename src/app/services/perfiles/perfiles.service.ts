import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PerfilBasico } from '../../interfaces/perfiles/perfil-basico';
import { environment } from '../../../environments/environment';
import { ResponseServicio } from '../../interfaces/varios/response-servicio';
import { FiltroGenericoLista } from '../../interfaces/varios/filtro-generico-lista';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { map } from 'rxjs/internal/operators/map';
import { BajaPerfil } from '../../interfaces/perfiles/baja-perfil';
import { EntidadAlg } from '../../interfaces/perfiles/entidad-alg';
import { EntidadAlgPk } from '../../interfaces/perfiles/entidad-alg-pk';
import { SolicitudAlta } from '../../interfaces/perfiles/solicitud-alta';
import { Observable } from 'rxjs';
import { PerfilBasicoInfoPersonal } from '../../interfaces/perfiles/perfil-basico-informacion-personal';


@Injectable({
	providedIn: 'root'
})
export class PerfilesService {

	private urlSeguridadPerfilRegistrar = `${environment.hostSeguridad}/perfiles/registrar`;
	private urlSeguridadPerfilListar = `${environment.hostSeguridad}/perfiles/lista`;
	private urlSeguridadPerfilModificar = `${environment.hostSeguridad}/perfiles/modificar`;
	private urlSeguridadPerfilLogueado = `${environment.hostSeguridad}/perfiles/perfil`;
	private urlSeguridadPerfilListarDeUnRol = `${environment.hostSeguridad}/perfiles/listaDeUnRol`;
	private urlSeguridadPerfilDarDeBaja = `${environment.hostSeguridad}/perfiles/darDeBaja`;
	private urlSeguridadPerfilEliminar = `${environment.hostSeguridad}/perfiles`;
	private urlSeguridadPerfilEntidadPorId = `${environment.hostSeguridad}/perfiles/entidadPorId`;
	private urlSeguridadPerfilSolicitudAlta = `${environment.hostSeguridad}/perfiles/solicitudAlta`;
	private urlSeguridadPerfilActualizarUnidadMedidaPeso = `${environment.hostSeguridad}/perfiles/actualizarUnidadMedidaPeso`;

	constructor(private http: HttpClient) { }

	// funcion encargada de registrar un nuevo perfil
	registrarNuevo(nuevoPerfil: PerfilBasico, token: string) {

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			})
		};

		let nuevoPerfilJson = JSON.stringify(nuevoPerfil);

		return this.http.post<ResponseServicio>(
			this.urlSeguridadPerfilRegistrar, nuevoPerfilJson, httpOptions);
	}

	// funcion que devuelve un listado paginado
	listadoPaginado(filtro: FiltroGenericoLista, token: string) {

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			})
		};

		let filtroJson = JSON.stringify(filtro);

		return this.http.post<ResponseServicio>(
			this.urlSeguridadPerfilListar, filtroJson, httpOptions);
	}

	// funcion encargada de actualizar la informacion personal y cuentas de un perfil existente
	actualizar(perfil: PerfilBasico, token: string) {

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			})
		};

		let perfilJson = JSON.stringify(perfil);

		return this.http.post<ResponseServicio>(
			this.urlSeguridadPerfilModificar, perfilJson, httpOptions);
	}

	// funcion que devuelve los datos del perfil que se encuentra vinculado al token actual
	perfilLogueado(token: string) {

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			})
		};

		return this.http.post<ResponseServicio>(
			this.urlSeguridadPerfilLogueado, null, httpOptions);
	}

	// funcion que devuelve un listado de perfiles correspondiente a un rol dado
	perfilesDeUnRolDado(rolId: any, filtro: string, token: string) {

		let httpHeaders = new HttpHeaders()
			.set('Content-Type', 'application/json')
			.set('Authorization', `Bearer ${token}`);

		let httpParams = new HttpParams()
			.set('rolId', rolId)
			.set('filtro', filtro);

		let options = {
			headers: httpHeaders,
			params: httpParams
		}

		return this.http
			.get<ResponseServicio>(this.urlSeguridadPerfilListarDeUnRol, options)
			.pipe(debounceTime(300), map(respuesta => {
				if (respuesta && respuesta.exito == true) {
					return respuesta.datos;
				} else {
					return [];
				}
			}));
	}

	// funcion encargada de dar de baja un perfil
	darDeBajaPerfil(perfilId: number, baja: boolean, token: string) {

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			})
		};

		let bajaPerfil: BajaPerfil = {
			perfilId: perfilId,
			baja: baja
		};

		return this.http.put<ResponseServicio>(
			this.urlSeguridadPerfilDarDeBaja, bajaPerfil, httpOptions);
	}

	// funcion encargada de eliminar un perfil
	eliminarPerfil(perfilId: number, token: string) {

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			})
		};

		let urlDelete = `${this.urlSeguridadPerfilEliminar}/${perfilId}`;
		return this.http.delete<ResponseServicio>(urlDelete, httpOptions);
	}

	// funcion que devuelve los datos de una entidad a partir del codigo de algoritmo
	datosCuenta(cuenta: string, token: string) {

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			})
		};

		let entidadPk: EntidadAlgPk = {
			tipoEntidad: 3,
			codigo: cuenta
		}

		return this.http.post<EntidadAlg>(
			this.urlSeguridadPerfilEntidadPorId, entidadPk, httpOptions);
	}

	// funcion que envia la solicitud de alta
	solicitudAlta(solicitud: SolicitudAlta): Observable<ResponseServicio> {
		const httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};

		let solicitudJson = JSON.stringify(solicitud);

		return this.http.post<ResponseServicio>(
			this.urlSeguridadPerfilSolicitudAlta,
			solicitudJson,
			httpOptions);
	}

	// funcion encargada de actualizar la unidad de medida de peso
	actualizarUnidadMedidaPeso(perfilInfoPersonal: PerfilBasicoInfoPersonal, token: string) {

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			})
		};

		let perfilInfoPersonalJson = JSON.stringify(perfilInfoPersonal);

		return this.http.put<ResponseServicio>(
			this.urlSeguridadPerfilActualizarUnidadMedidaPeso, perfilInfoPersonalJson, httpOptions);
	}
}
