import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FiltroResumenContratoCompraVenta } from '../../interfaces/contratos/filtro-resumen-contrato-compra-venta';
import { Observable } from 'rxjs';
import { FiltroEspecieCosecha } from '../../interfaces/varios/filtro-especie-cosecha';
import { ResponseServicio } from '../../interfaces/varios/response-servicio';
import { Cacheable } from 'ngx-cacheable';
import { ResponseListadoPaginado } from '../../interfaces/varios/response-listado-paginado';
import { FiltroVentas } from '../../interfaces/ventas/filtro-ventas';

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
  private urlContratosIndicadoresGlobalVentas = `${environment.hostEntregasYVentas}/contratos/indicadoresGlobalVentas`;
  private urlContratosKgDisponiblesParaCanjePorEspecie = `${environment.hostEntregasYVentas}/contratos/kgDiponiblesParaCanjeAgrupadoPorEspecie`;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Devuelve un listado de contratos resumido con información de entregas y fijaciones básicas
   * @param filtro
   */
  @Cacheable()
  listadoContratosResumidos(filtro: FiltroResumenContratoCompraVenta): Observable<ResponseListadoPaginado> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<ResponseListadoPaginado>(this.urlContratosListado, JSON.stringify(filtro), httpOptions);
  }

  /**
   * Función que retorna un listado de filtros especie cosecha
   * @param cuenta 
   */
  @Cacheable()
  listadoFiltrosEspecieCosecha(cuenta: string): Observable<FiltroEspecieCosecha> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
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
  @Cacheable()
  contrato(nroSucursal: number, nroComprobante: number): Observable<ResponseServicio> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let urlConParametro = `${this.urlContratosComprobante}/${nroSucursal}/${nroComprobante}`;
    return this.http.get<ResponseServicio>(urlConParametro, httpOptions);
  }

  /**
   * Función que devuelve el resumen de un contrato vinculado a un ticket indicado
   * @param tk Identificación completa de un ticket ej: TK 0001 00000232
   */
  @Cacheable()
  contratoResumenPorTk(tk: string): Observable<ResponseServicio> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let urlConParametro = `${this.urlContratosContratoResumenPorTk}/${tk}`;
    return this.http.get<ResponseServicio>(urlConParametro, httpOptions);
  }

  /**
   * Función que devuelve el resumen de un contrato a partir del id del contrato
   * @param id Identificador del contrato
   */
  @Cacheable()
  contratoResumenPorId(id: number): Observable<ResponseServicio> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let urlConParametro = `${this.urlContratosContratoResumenPorID}/${id}`;
    return this.http.get<ResponseServicio>(urlConParametro, httpOptions);
  }

  /**
   * Función que devuelve los totales entregados, pendiente de entrgar, fijados, etc de una cuenta dada
   * @param cuenta Identificador de la cuenta del productor
   * @param cosecha Identificador de la cosecha en formato xxyy, si no se indica, se suma desde 1718 en adelante
   */
  @Cacheable()
  indicadoresPorEspecie(cuenta: string, cosecha?: string): Observable<ResponseServicio> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let paramCosecha = cosecha ? cosecha : "pordefecto";

    let urlConParametro = `${this.urlContratosIndicadoresPorEspecie}/${cuenta}/${paramCosecha}`;
    return this.http.get<ResponseServicio>(urlConParametro, httpOptions);
  }

  /**
   * Devuelve los indicadores de ventas: pactadas, fijadass, pesificadas, liquidadas y pagadas
   * @param filtro 
   */
  @Cacheable()
  indicadoresGlobalVentas(filtro: FiltroVentas): Observable<ResponseServicio> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let dataJson = JSON.stringify(filtro);

    return this.http.post<ResponseServicio>(this.urlContratosIndicadoresGlobalVentas, dataJson, httpOptions);
  }

  /**
   * Retorna un listado con los kilos disponibles para canjear indicando lo pendiente de fijar y pesificar
   * @param cuenta 
   */
  contratosKgDisponiblesParaCanjePorEspecie(cuenta: string): Observable<ResponseServicio> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let urlConParametro = `${this.urlContratosKgDisponiblesParaCanjePorEspecie}/${cuenta}`;
    return this.http.get<ResponseServicio>(urlConParametro, httpOptions);
  }
}
