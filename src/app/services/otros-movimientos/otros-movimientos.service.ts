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

	private urlOtrosMovimientosListado = `${environment.hostEntregasYVentas}/OtrosMovimientos/listado`;
	private urlOtrosMovimientosFiltrosEspecieCosecha = `${environment.hostEntregasYVentas}/OtrosMovimientos/filtrosEspecieCosechas`;

	constructor(private http: HttpClient) { }

	// funcion que retorna un observable del listado con los otros movimientos asociado a una cuenta dada
	listado(filtro: FiltroOtrosMovimientos) {

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		};

		return this.http.post<ListadoOtrosMovimientos>(this.urlOtrosMovimientosListado,
			JSON.stringify(filtro),
			httpOptions);
	}

	// funcion que retorna un listado de filtros especie cosecha
	listadoFiltrosEspecieCosecha(cuenta: string): Observable<Array<FiltroEspecieCosecha>> {

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		};

		let urlConParametro = `${this.urlOtrosMovimientosFiltrosEspecieCosecha}/${cuenta}`;
		return this.http.get<Array<FiltroEspecieCosecha>>(urlConParametro, httpOptions);
	}

}
