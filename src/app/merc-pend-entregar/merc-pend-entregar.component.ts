import { Component, OnInit } from '@angular/core';
import { MercPendEntregarService } from '../services/merc-pend-entregar/merc-pend-entregar.service';
import { MovimientoMercPendEntregar, MercPendEntregarTotales } from '../interfaces/mercaderia-pend-entregar/listado-merc-pend-entregar';
import { FiltroMercaderiaPendEntregar } from '../interfaces/mercaderia-pend-entregar/filtro-merc-pend-entregar';
import { UserAuth } from '../models/security/user';
import { AuthenticationService } from '../services/security/authentication.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material';
import { MercPendEntregarDetalleComponent } from '../merc-pend-entregar-detalle/merc-pend-entregar-detalle.component';
import { MercPendEntregarMasOperacionesComponent } from '../merc-pend-entregar-mas-operaciones/merc-pend-entregar-mas-operaciones.component';

@Component({
  selector: 'app-merc-pend-entregar',
  templateUrl: './merc-pend-entregar.component.html',
  styleUrls: ['./merc-pend-entregar.component.css'],
  providers: [DatePipe]
})
export class MercPendEntregarComponent implements OnInit {

  public listadoMercPendEntregar: Array<MovimientoMercPendEntregar>;
  private movimientoSeleccionado: MovimientoMercPendEntregar = null;
  public totales: MercPendEntregarTotales = null;
  public cargando: boolean;

  public cuenta: string = "";
  public fechaDesde: Date = new Date();
  public fechaHasta: Date = new Date();

  constructor(private mercPendEntregarService: MercPendEntregarService,
    private authenticationService: AuthenticationService,
    private datePipe: DatePipe,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.cargando = false;
  }

  // funcion que ejecuta la carga del listado de mercaderia pendiente de entregar
  cargarListado() {
    this.cargando = true;

    let filtro: FiltroMercaderiaPendEntregar = {
      cuenta: this.cuenta,
      fechaDesde: this.datePipe.transform(this.fechaDesde, 'dd/MM/yyyy'),
      fechaHasta: this.datePipe.transform(this.fechaHasta, 'dd/MM/yyyy')
    }

    let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();
    if (usuarioLogueado != null) {
      return this.mercPendEntregarService.listadoMercPendEntregar(filtro, usuarioLogueado.token).subscribe(respuesta => {
        this.listadoMercPendEntregar = respuesta.datos.listado;
        this.totales = respuesta.datos.totales;

        this.cargando = false;
      }, error => {
        this.cargando = false;
      });
    }
  }

  // funcion que muestra el detalle de un movimiento seleccionado
  verDetalle(movimiento: MovimientoMercPendEntregar) {
    this.movimientoSeleccionado = movimiento;

    this.dialog.open(MercPendEntregarDetalleComponent, {
      data: movimiento
    });
  }

  // funcion que muestra las operaciones extras
  verOpcionesExtras() {
    this.dialog.open(MercPendEntregarMasOperacionesComponent, {
      data: {
        movimientos: this.listadoMercPendEntregar,
        totales: this.totales
      }
    });
  }
}
