import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComprobanteParaDescarga } from '../../../interfaces/archivo-de-comprobantes/comprobante-para-descarga';

@Injectable({
	providedIn: 'root'
})
export class ComprobantesDownloaderService {

	private urlCtaCteComprobantesDescargar = `${environment.hostCtaCte}/Comprobantes/descargar`;
	private urlCtaCteComprobantesDescargarMasivo = `${environment.hostCtaCte}/Comprobantes/descargarMasivo`;
	private urlGeneradorComprobanteConfVentaDescargar = `${environment.hostGeneradorComprobantes}/confirmacionesDeVentas/descargar`;
	private urlGeneradorComprobanteCertificado1116ADescargar = `${environment.hostGeneradorComprobantes}/afip/certificado1116A`;
	private urlGeneradorComprobanteConfVentaDescargarMasivo = `${environment.hostGeneradorComprobantes}/confirmacionesDeVentas/descargarMasivo`;
	private urlGeneradorComprobanteCertificado1116ADescargarMasivo = `${environment.hostGeneradorComprobantes}/afip/certificado1116AMasivo`;

	constructor(
		private http: HttpClient
	) { }

	// funcion que devuelve un comprobante pdf a partir del link y nombre de comprobante dado
	comprobanteDescargado(link: string, comprobante: string): Observable<Blob> {

		let headers = new HttpHeaders({
			'Content-Type': 'application/pdf'
		});

		let params = new HttpParams().set('link', link).set('comprobante', comprobante);

		const options = {
			headers, params, responseType: 'blob' as 'blob'
		}

		return this.http.get(this.urlCtaCteComprobantesDescargar, options);
	}

	// funcion que devuelve un zip con comprobantes pdf a partir de un listado de comprobantes a descargar
	comprobanteDescargadoMasivo(comprobantes: Array<ComprobanteParaDescarga>): Observable<Blob> {

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/zip'
			}),
			responseType: 'blob' as 'blob'
		};

		return this.http.post(this.urlCtaCteComprobantesDescargarMasivo, JSON.stringify(comprobantes), httpOptions);
	}

	// funcion que devuelve un comprobante pdf correspondiente a una confirmacion de venta dada
	confirmacionVentaDescargado(nroSucursal: number, nroComprobante: number): Observable<Blob> {

		let headers = new HttpHeaders({
			'Content-Type': 'application/pdf'
		});

		let url = `${this.urlGeneradorComprobanteConfVentaDescargar}/${nroSucursal}/${nroComprobante}`;

		const options = {
			headers, responseType: 'blob' as 'blob'
		}

		return this.http.get(url, options);
	}

	/**
	 * Descarga pdf del certificado desde Afip
	 * @param nro1116A Identificador del certificado
	 */
	certificadoAfipDescargado(nro1116A): Observable<Blob> {

		let headers = new HttpHeaders({
			'Content-Type': 'application/pdf'
		});

		let url = `${this.urlGeneradorComprobanteCertificado1116ADescargar}/${nro1116A}`;

		const options = {
			headers, responseType: 'blob' as 'blob'
		}

		return this.http.get(url, options);
	}

	/**
	 * Descarga un zip con los pdf de las confirmaciones de ventas
	 * @param identificadores Listado de objetos con dos atributos: sucursal y comprobante
	 */
	confirmacionVentaDescargadoMasivo(identificadores: Array<any>): Observable<Blob> {

		let headers = new HttpHeaders({
			'Content-Type': 'application/zip'
		});

		let identificadoresParam = identificadores
			.map(identificador => {
				return `${identificador.sucursal}-${identificador.comprobante}`;
			})
			.join(",");

		let url = `${this.urlGeneradorComprobanteConfVentaDescargarMasivo}/${identificadoresParam}`;

		const options = {
			headers, responseType: 'blob' as 'blob'
		}

		return this.http.get(url, options);
	}

	/**
	 * Descarga un zip con los pdf de los certificados de afip de entregas
	 * @param identificadores Listado de objetos con dos atributos: nroCertificado
	 */
	certificadoAfipDescargadoMasivo(identificadores: Array<any>): Observable<Blob> {

		let headers = new HttpHeaders({
			'Content-Type': 'application/zip'
		});

		let identificadoresParam = identificadores.join(",");
		let url = `${this.urlGeneradorComprobanteCertificado1116ADescargarMasivo}/${identificadoresParam}`;

		const options = {
			headers, responseType: 'blob' as 'blob'
		}

		return this.http.get(url, options);
	}
}
