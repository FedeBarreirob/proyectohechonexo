import { Component, OnInit } from '@angular/core';
import { ComprobantesPendFacturarService } from '../../../../services/comprobantes-pend-facturar/comprobantes-pend-facturar.service';
import { MovimientoComprobantesPendFact, ComprobantesPendFactTotales } from '../../../../interfaces/comprobantes-pend-facturar/listado-comp-pend-fact';
import { FiltroComprobantesPendFacturar } from '../../../../interfaces/comprobantes-pend-facturar/filtro-comp-pend-fact';
import { UserAuth } from '../../../../models/security/user';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material';
import { ComprobantesPendFacturarDetalleComponent } from '../comprobantes-pend-facturar-detalle/comprobantes-pend-facturar-detalle.component';
import { ComprobantesPendFacturarMasOperacionesComponent } from '../comprobantes-pend-facturar-mas-operaciones/comprobantes-pend-facturar-mas-operaciones.component';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';

@Component({
  selector: 'app-comprobantes-pend-facturar',
  templateUrl: './comprobantes-pend-facturar.component.html',
  styleUrls: ['./comprobantes-pend-facturar.component.css'],
  providers: [DatePipe]
})
export class ComprobantesPendFacturarComponent implements OnInit {

  public listadoCompPendFact: Array<MovimientoComprobantesPendFact>;
  private movimientoSeleccionado: MovimientoComprobantesPendFact = null;
  public totales: ComprobantesPendFactTotales = null;
  public cargando: boolean;

  public cuenta: string = "";
  public perfilBasico: PerfilBasico;
  public fechaDesde: Date = new Date();
  public fechaHasta: Date = new Date();

  constructor(private compPendFactService: ComprobantesPendFacturarService,
    private authenticationService: AuthenticationService,
    private datePipe: DatePipe,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.cargando = false;
    
    this.authenticationService.perfilActivo$.subscribe(
      perfil => this.perfilBasico = perfil);
  }

  // funcion que ejecuta la carga del listado de comprobantes pendientes de facturar
  cargarListado() {
    this.cargando = true;

    let filtro: FiltroComprobantesPendFacturar = {
      cuenta: this.cuenta,
      fechaDesde: this.datePipe.transform(this.fechaDesde, 'dd/MM/yyyy'),
      fechaHasta: this.datePipe.transform(this.fechaHasta, 'dd/MM/yyyy')
    }

    let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();
    if (usuarioLogueado != null) {
      return this.compPendFactService.listadoComprobPendFact(filtro, usuarioLogueado.token).subscribe(respuesta => {
        this.listadoCompPendFact = respuesta.datos.listado;
        this.totales = respuesta.datos.totales;

        this.cargando = false;
      }, error => {
        this.cargando = false;
      });
    }
  }

  // funcion que muestra el detalle de un movimiento seleccionado
  verDetalle(movimiento: MovimientoComprobantesPendFact) {
    this.movimientoSeleccionado = movimiento;

    this.dialog.open(ComprobantesPendFacturarDetalleComponent, {
      data: movimiento
    });
  }

  // funcion que muestra las operaciones extras
  verOpcionesExtras() {
    this.dialog.open(ComprobantesPendFacturarMasOperacionesComponent, {
      data: {
        movimientos: this.listadoCompPendFact,
        totales: this.totales
      }
    });
  }

  // funcion encargada de capturar el valor de la cuenta
  seleccionarCuenta(cuentaSeleccionada?: string) {
    this.cuenta = cuentaSeleccionada;
  }
}
