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
}
