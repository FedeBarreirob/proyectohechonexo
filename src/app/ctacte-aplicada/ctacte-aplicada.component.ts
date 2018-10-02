import { Component, OnInit } from '@angular/core';
import { CtacteAplicadaService } from '../services/ctacte-aplicada/ctacte-aplicada.service'
import { MovimientoCtaCteAplicada, SaldosTotales } from '../interfaces/ctacte-aplicada/listado-ctacte-aplicada';
import { FiltroCtacteAplicada } from '../interfaces/ctacte-aplicada/filtro-ctacte-aplicada';
import { UserAuth } from '../models/security/user';
import { AuthenticationService } from '../services/security/authentication.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material';
import { CtacteAplicadaDetalleComponent } from '../ctacte-aplicada-detalle/ctacte-aplicada-detalle.component';
import { CtaCteAplicadaMasOperacionesComponent } from '../cta-cte-aplicada-mas-operaciones/cta-cte-aplicada-mas-operaciones.component';

@Component({
  selector: 'app-ctacte-aplicada',
  templateUrl: './ctacte-aplicada.component.html',
  styleUrls: ['./ctacte-aplicada.component.css'],
  providers: [DatePipe]
})
export class CtacteAplicadaComponent implements OnInit {

  public listadoCtaCte: Array<MovimientoCtaCteAplicada>;
  private movimientoSeleccionado: MovimientoCtaCteAplicada = null;
  public saldosTotales: SaldosTotales = null;
  public cargando: boolean;

  public cuenta: string = "";
  public fechaDesde: Date = new Date();
  public fechaHasta: Date = new Date();

  constructor(private ctacteService: CtacteAplicadaService,
    private authenticationService: AuthenticationService,
    private datePipe: DatePipe,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.cargando = false;
  }

  // funcion que ejecuta la carga del listado de ctacte
  cargarListado() {
    this.cargando = true;

    let filtro: FiltroCtacteAplicada = {
      cuenta: this.cuenta,
      fechaDesde: this.datePipe.transform(this.fechaDesde, 'dd/MM/yyyy'),
      fechaHasta: this.datePipe.transform(this.fechaHasta, 'dd/MM/yyyy')
    }

    let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();
    if (usuarioLogueado != null) {
      return this.ctacteService.listadoCtaCte(filtro, usuarioLogueado.token).subscribe(respuesta => {
        this.listadoCtaCte = respuesta.datos.listado;
        this.saldosTotales = respuesta.datos.saldosTotales;

        this.cargando = false;
      }, error => {
        this.cargando = false;
      });
    }
  }

  // funcion que muestra el detalle de un movimiento seleccionado
  verDetalle(movimiento: MovimientoCtaCteAplicada) {
    this.movimientoSeleccionado = movimiento;

    this.dialog.open(CtacteAplicadaDetalleComponent, {
      data: movimiento
    });
  }

  // funcion que muestra las operaciones extras
  verOpcionesExtras() {
    this.dialog.open(CtaCteAplicadaMasOperacionesComponent, {
      data: {
        movimientos: this.listadoCtaCte,
        saldos: this.saldosTotales
      } 
    });
  }
}
