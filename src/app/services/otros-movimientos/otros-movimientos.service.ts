import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FiltroEspecieCosecha } from '../../interfaces/varios/filtro-especie-cosecha';
import { Observable } from 'rxjs';
import { FiltroOtrosMovimientos } from '../../interfaces/otros-movimientos/filtro-otros-movimientos';
import { ListadoOtrosMovimientos } from '../../interfaces/otros-movimientos/listado-otros-movimientos';

@Injectable({
	providedIn: 'root'
})
export class OtrosMovimientosService {

	constructor(private http: HttpClient) { }

	// funcion que retorna un observable del listado con los otros movimientos asociado a una cuenta dada
	listado(filtro: FiltroOtrosMovimientos, token: string) {

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			})
		};

		return this.http.post<ListadoOtrosMovimientos>(environment.urlOtrosMovimientosListado,
			JSON.stringify(filtro),
			httpOptions);
	}

	// funcion que retorna un listado de filtros especie cosecha
	listadoFiltrosEspecieCosecha(cuenta: string, token: string): Observable<Array<FiltroEspecieCosecha>> {

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			})
		};

		let urlConParametro = `${environment.urlOtrosMovimientosFiltrosEspecieCosecha}/${cuenta}`;
		return this.http.get<Array<FiltroEspecieCosecha>>(urlConParametro, httpOptions);
	}

}
