import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../security/authentication.service';
import { FiltroResumenContratoCompraVenta } from '../../interfaces/contratos/filtro-resumen-contrato-compra-venta';
import { UserAuth } from '../../models/security/user';
import { Observable } from 'rxjs';
import { FiltroEspecieCosecha } from '../../interfaces/varios/filtro-especie-cosecha';
import { ResponseServicio } from '../../interfaces/varios/response-servicio';

@Injectable({
  providedIn: 'root'
})
export class ContratosService {

  private urlContratosListado = `${environment.hostEntregasYVentas}/contratos/listado`;
  private urlContratosFiltrosEspecieCosecha = `${environment.hostEntregasYVentas}/contratos/filtrosEspecieCosechas`;
  private urlContratosComprobante = `${environment.hostGeneradorComprobantes}/confirmacionesDeVentas/comprobante`;
  private urlContratosContratoResumenPorTk = `${environment.hostEntregasYVentas}/contratos/contratoResumidoDeTicketAplicado`;
  private urlContratosContratoResumenPorID = `${environment.hostEntregasYVentas}/contratos/contratoResumidoPorId`;
  private urlContratosIndicadoresPorEspecie = `${environment.hostEntregasYVentas}/contratos/indicadoresPorEspecie`;

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  /**
   * Devuelve un listado de contratos resumido con información de entregas y fijaciones básicas
   * @param filtro
   */
  listadoContratosResumidos(filtro: FiltroResumenContratoCompraVenta) {

    let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usuarioLogueado.token}`
      })
    };

    return this.http.post<any>(this.urlContratosListado, JSON.stringify(filtro), httpOptions);
  }

  /**
   * Función que retorna un listado de filtros especie cosecha
   * @param cuenta 
   */
  listadoFiltrosEspecieCosecha(cuenta: string): Observable<FiltroEspecieCosecha> {

    let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usuarioLogueado.token}`
      })
    };

    let urlConParametro = `${this.urlContratosFiltrosEspecieCosecha}/${cuenta}`;
    return this.http.get<FiltroEspecieCosecha>(urlConParametro, httpOptions);
  }

  /**
   * Devuelve los datos de un boleto
   * @param nroSucursal Número de sucursal asociado al boleto
   * @param nroComprobante Número de comprobante asociado al boleto
   */
  contrato(nroSucursal: number, nroComprobante: number): Observable<ResponseServicio> {

    let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usuarioLogueado.token}`
      })
    };

    let urlConParametro = `${this.urlContratosComprobante}/${nroSucursal}/${nroComprobante}`;
    return this.http.get<ResponseServicio>(urlConParametro, httpOptions);
  }

  /**
   * Función que devuelve el resumen de un contrato vinculado a un ticket indicado
   * @param tk Identificación completa de un ticket ej: TK 0001 00000232
   */
  contratoResumenPorTk(tk: string): Observable<ResponseServicio> {

    let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usuarioLogueado.token}`
      })
    };

    let urlConParametro = `${this.urlContratosContratoResumenPorTk}/${tk}`;
    return this.http.get<ResponseServicio>(urlConParametro, httpOptions);
  }

  /**
   * Función que devuelve el resumen de un contrato a partir del id del contrato
   * @param id Identificador del contrato
   */
  contratoResumenPorId(id: number): Observable<ResponseServicio> {

    let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usuarioLogueado.token}`
      })
    };

    let urlConParametro = `${this.urlContratosContratoResumenPorID}/${id}`;
    return this.http.get<ResponseServicio>(urlConParametro, httpOptions);
  }

  /**
   * Función que devuelve los totales entregados, pendiente de entrgar, fijados, etc de una cuenta dada
   * @param cuenta Identificador de la cuenta del productor
   */
  indicadoresPorEspecie(cuenta: string): Observable<ResponseServicio> {

    let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usuarioLogueado.token}`
      })
    };

    let urlConParametro = `${this.urlContratosIndicadoresPorEspecie}/${cuenta}`;
    return this.http.get<ResponseServicio>(urlConParametro, httpOptions);
  }
}
