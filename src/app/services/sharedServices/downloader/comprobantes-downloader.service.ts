import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComprobanteParaDescarga } from '../../../interfaces/archivo-de-comprobantes/comprobante-para-descarga';
import { AuthenticationService } from '../../security/authentication.service';
import { UserAuth } from '../../../models/security/user';

@Injectable({
	providedIn: 'root'
})
export class ComprobantesDownloaderService {

	private urlCtaCteComprobantesDescargar = `${environment.hostCtaCte}/Comprobantes/descargar`;
	private urlCtaCteComprobantesDescargarMasivo = `${environment.hostCtaCte}/Comprobantes/descargarMasivo`;
	private urlGeneradorComprobanteConfVentaDescargar = `${environment.hostGeneradorComprobantes}/confirmacionesDeVentas/descargar`;

	constructor(
		private http: HttpClient,
		private authenticationService: AuthenticationService
	) { }

	// funcion que devuelve un comprobante pdf a partir del link y nombre de comprobante dado
	comprobanteDescargado(link: string, comprobante: string): Observable<Blob> {

		let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();

		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${usuarioLogueado.token}`
		});

		let params = new HttpParams().set('link', link).set('comprobante', comprobante);

		const options = {
			headers, params, responseType: 'blob' as 'blob'
		}

		return this.http.get(this.urlCtaCteComprobantesDescargar, options);
	}

	// funcion que devuelve un zip con comprobantes pdf a partir de un listado de comprobantes a descargar
	comprobanteDescargadoMasivo(comprobantes: Array<ComprobanteParaDescarga>): Observable<Blob> {

		let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${usuarioLogueado.token}`
			}),
			responseType: 'blob' as 'blob'
		};

		return this.http.post(this.urlCtaCteComprobantesDescargarMasivo, JSON.stringify(comprobantes), httpOptions);
	}

	// funcion que devuelve un comprobante pdf correspondiente a una confirmacion de venta dada
	confirmacionVentaDescargado(nroSucursal: number, nroComprobante: number): Observable<Blob> {

		let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();

		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${usuarioLogueado.token}`
		});

		let url = `${this.urlGeneradorComprobanteConfVentaDescargar}/${nroSucursal}/${nroComprobante}`;

		const options = {
			headers, responseType: 'blob' as 'blob'
		}

		return this.http.get(url, options);
	}
}
