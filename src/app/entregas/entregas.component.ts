import { Component, OnInit } from '@angular/core';
import { EntregasService } from '../services/entregas/entregas.service';
import { MovimientoEntrega, EntregasTotales } from '../interfaces/entregas/listado-entregas';
import { FiltroEntregas } from '../interfaces/entregas/filtro-entregas';
import { UserAuth } from '../models/security/user';
import { AuthenticationService } from '../services/security/authentication.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material';
import { EntregasDetalleComponent } from '../entregas-detalle/entregas-detalle.component';
import { EntregasMasOperacionesComponent } from '../entregas-mas-operaciones/entregas-mas-operaciones.component';

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.component.html',
  styleUrls: ['./entregas.component.css'],
  providers: [DatePipe]
})
export class EntregasComponent implements OnInit {

  public listadoEntregas: Array<MovimientoEntrega>;
  private movimientoSeleccionado: MovimientoEntrega = null;
  public totales: EntregasTotales = null;
  public cargando: boolean;

  public cuenta: string = "";
  public fechaDesde: Date = new Date();
  public fechaHasta: Date = new Date();

  constructor(private entregasService: EntregasService,
    private authenticationService: AuthenticationService,
    private datePipe: DatePipe,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.cargando = false;
  }

  // funcion que ejecuta la carga del listado de entregas
  cargarListado() {
    this.cargando = true;

    let filtro: FiltroEntregas = {
      cuenta: this.cuenta,
      fechaDesde: this.datePipe.transform(this.fechaDesde, 'dd/MM/yyyy'),
      fechaHasta: this.datePipe.transform(this.fechaHasta, 'dd/MM/yyyy')
    }

    let usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();
    if (usuarioLogueado != null) {
      return this.entregasService.listadoEntregas(filtro, usuarioLogueado.token).subscribe(respuesta => {
        this.listadoEntregas = respuesta.datos.listado;
        this.totales = respuesta.datos.totales;

        this.cargando = false;
      }, error => {
        this.cargando = false;
      });
    }
  }

  // funcion que muestra el detalle de un movimiento seleccionado
  verDetalle(movimiento: MovimientoEntrega) {
    this.movimientoSeleccionado = movimiento;

    this.dialog.open(EntregasDetalleComponent, {
      data: movimiento
    });
  }

  // funcion que muestra las operaciones extras
  verOpcionesExtras() {
    this.dialog.open(EntregasMasOperacionesComponent, {
      data: {
        movimientos: this.listadoEntregas,
        totales: this.totales
      }
    });
  }
}
