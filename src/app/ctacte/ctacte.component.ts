import { Component, OnInit } from '@angular/core';
import { CtacteService } from '../services/ctacte/ctacte.service'
import { MovimientoCtaCte, SaldosTotales } from '../interfaces/ctacte/listado.ctacte';
import { FiltroListadoCtaCte } from '../interfaces/ctacte/filtro.listado.ctacte';
import { UserAuth } from '../models/security/user';
import { AuthenticationService } from '../services/security/authentication.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material';
import { CtacteDetalleComponent } from '../ctacte.detalle/ctacte.detalle.component';
import { CtacteMasOperacionesComponent } from '../ctacte-mas-operaciones/ctacte-mas-operaciones.component';

@Component({
  selector: 'app-ctacte',
  templateUrl: './ctacte.component.html',
  styleUrls: ['./ctacte.component.css'],
  providers: [DatePipe]
})
export class CtacteComponent implements OnInit {

  public listadoCtaCte: Array<MovimientoCtaCte>;
  private movimientoSeleccionado: MovimientoCtaCte = null;
  public saldosTotales: SaldosTotales = null;
  public cargando: boolean;

  public cuenta: string = "";
  public fechaDesde: Date = new Date();
  public fechaHasta: Date = new Date();

  constructor(
    private ctacteService: CtacteService,
    private authenticationService: AuthenticationService,
    private datePipe: DatePipe,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.cargando = false;
  }

  // funcion que ejecuta la carga del listado de ctacte
  cargarListado() {
    this.cargando = true;

    let filtro: FiltroListadoCtaCte = {
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
  verDetalle(movimiento: MovimientoCtaCte) {
    this.movimientoSeleccionado = movimiento;

    this.dialog.open(CtacteDetalleComponent, {
      data: movimiento
    });
  }

  // funcion que muestra las operaciones extras
  verOpcionesExtras() {
    this.dialog.open(CtacteMasOperacionesComponent, {
      data: {
        movimientos: this.listadoCtaCte,
        saldos: this.saldosTotales
      } 
    });
  }
}
