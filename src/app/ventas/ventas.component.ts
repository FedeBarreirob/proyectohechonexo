import { Component, OnInit } from '@angular/core';
import { VentasService } from '../services/ventas/ventas.service';
import { MovimientoVenta, VentasTotales } from '../interfaces/ventas/listado-ventas';
import { FiltroVentas } from '../interfaces/ventas/filtro-ventas';
import { UserAuth } from '../models/security/user';
import { AuthenticationService } from '../services/security/authentication.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material';
import { VentasDetalleComponent } from '../ventas-detalle/ventas-detalle.component';
import { VentasMasOperacionesComponent } from '../ventas-mas-operaciones/ventas-mas-operaciones.component';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  providers: [DatePipe]
})
export class VentasComponent implements OnInit {

  public listadoVentas: Array<MovimientoVenta>;
  private movimientoSeleccionado: MovimientoVenta = null;
  public totales: VentasTotales = null;
  public cargando: boolean;

  public cuenta: string = "";
  public fechaDesde: Date = new Date();
  public fechaHasta: Date = new Date();

  constructor(private ventasService: VentasService,
    private authenticationService: AuthenticationService,
    private datePipe: DatePipe,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.cargando = false;
  }

  // funcion que ejecuta la carga del listado de ventas
  cargarListado() {
    this.cargando = true;

    let filtro: FiltroVentas = {
      cuenta: this.cuenta,
      fechaDesde: this.datePipe.transform(this.fechaDesde, 'dd/MM/yyyy'),
      fechaHasta: this.datePipe.transform(this.fechaHasta, 'dd/MM/yyyy')
    }

    let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();
    if (usuarioLogueado != null) {
      return this.ventasService.listadoVentas(filtro, usuarioLogueado.token).subscribe(respuesta => {
        this.listadoVentas = respuesta.datos.listado;
        this.totales = respuesta.datos.totales;

        this.cargando = false;
      }, error => {
        this.cargando = false;
      });
    }
  }

  // funcion que muestra el detalle de un movimiento seleccionado
  verDetalle(movimiento: MovimientoVenta) {
    this.movimientoSeleccionado = movimiento;

    this.dialog.open(VentasDetalleComponent, {
      data: movimiento
    });
  }

  // funcion que muestra las operaciones extras
  verOpcionesExtras() {
    this.dialog.open(VentasMasOperacionesComponent, {
      data: {
        movimientos: this.listadoVentas,
        totales: this.totales
      }
    });
  }
}
