import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseServicio } from '../../interfaces/varios/response-servicio';
import { Observable, Subject } from 'rxjs';
import { Notificacion } from '../../interfaces/notificaciones/notificacion';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
	providedIn: 'root'
})
export class NotificacionesService {

  private urlNotificacionesListado = `${environment.hostComunicaciones}/Notificaciones`;
  private urlNotificacionPorId = `${environment.hostComunicaciones}/NotificacionPorId`;
	private urlNotificacionesCantidadConEstadoDado = `${environment.hostComunicaciones}/Notificaciones/cantidadConEstadoDado`;
	private urlNotificacionesCambiarEstado = `${environment.hostComunicaciones}/Notificaciones/cambiarEstado`;

	constructor(
		private http: HttpClient
	) { }

	private _huboCambiosEstadoMensajes$ = new Subject<boolean>();

	// funcion que retorna un listado de notificaciones
	@Cacheable()
	listadoNotificaciones(perfilId: number, numeroPagina: number, cantPorPagina: number): Observable<ResponseServicio> {

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		};

		let urlConParametro = `${this.urlNotificacionesListado}/${perfilId}/${numeroPagina}/${cantPorPagina}`;
		return this.http.get<ResponseServicio>(urlConParametro, httpOptions);
  }

  notificacionPorId(perfilId: number, notificacionId: number): Observable<ResponseServicio> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let urlConParametro = `${this.urlNotificacionPorId}/${perfilId}/${notificacionId}`;
    return this.http.get<ResponseServicio>(urlConParametro, httpOptions);
  }

	// funcion que retorna la cantidad de mensajes en un estado indicado
	cantidadMensajesEnEstadoIndicado(perfilId: number, estado: number): Observable<ResponseServicio> {

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		};

		let urlConParametro = `${this.urlNotificacionesCantidadConEstadoDado}/${perfilId}/${estado}`;
		return this.http.get<ResponseServicio>(urlConParametro, httpOptions);
	}

	// funcion encargada de marcar un mensaje segun estado dado
	marcarNotificacion(notificacion: Notificacion): Observable<ResponseServicio> {

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		};

		let notificacionJson = JSON.stringify(notificacion);

		return this.http.put<ResponseServicio>(
			this.urlNotificacionesCambiarEstado,
			notificacionJson,
			httpOptions);
	}

	// funcion encargada de notificar que hubo un cambio en los estado de los mensajes
	huboCambiosEnEstado() {
		this._huboCambiosEstadoMensajes$.next(true);
	}

	// devuelve el observable indicando si hubo cambios en notificacion
	get huboCambiosEstadoMensajes$(): Observable<boolean> {
		return this._huboCambiosEstadoMensajes$.asObservable();
	}
}
