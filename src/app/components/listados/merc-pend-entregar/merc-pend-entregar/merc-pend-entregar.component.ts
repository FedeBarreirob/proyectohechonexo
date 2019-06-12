import { Component, OnInit } from '@angular/core';
import { MercPendEntregarService } from '../../../../services/merc-pend-entregar/merc-pend-entregar.service';
import { MovimientoMercPendEntregar, MercPendEntregarTotales } from '../../../../interfaces/mercaderia-pend-entregar/listado-merc-pend-entregar';
import { FiltroMercaderiaPendEntregar } from '../../../../interfaces/mercaderia-pend-entregar/filtro-merc-pend-entregar';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material';
import { MercPendEntregarDetalleComponent } from '../merc-pend-entregar-detalle/merc-pend-entregar-detalle.component';
import { MercPendEntregarMasOperacionesComponent } from '../merc-pend-entregar-mas-operaciones/merc-pend-entregar-mas-operaciones.component';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';

@Component({
  selector: 'app-merc-pend-entregar',
  templateUrl: './merc-pend-entregar.component.html',
  styleUrls: ['./merc-pend-entregar.component.css'],
  providers: [DatePipe]
})
export class MercPendEntregarComponent implements OnInit {

  public listadoMercPendEntregar: Array<MovimientoMercPendEntregar>;
  public totales: MercPendEntregarTotales = null;
  public cargando: boolean;

  public cuenta: string = "";
  public perfilBasico: PerfilBasico;
  public fechaDesde: string;
  public fechaHasta: string = (new Date()).toISOString();

  constructor(private mercPendEntregarService: MercPendEntregarService,
    private authenticationService: AuthenticationService,
    private datePipe: DatePipe,
    public dialog: MatDialog) {
    this.establecerFiltrosPorDefecto();
  }

  ngOnInit() {
    this.cargando = false;

    this.authenticationService.perfilActivo$.subscribe(
      perfil => this.perfilBasico = perfil);
  }

  // funcion que ejecuta la carga del listado de mercaderia pendiente de entregar
  cargarListado() {
    if (this.cargando == false) {
      this.cargando = true;
      this.limpiar();

      let filtro: FiltroMercaderiaPendEntregar = {
        cuenta: this.cuenta,
        fechaDesde: this.datePipe.transform(new Date(this.fechaDesde), 'dd/MM/yyyy'),
        fechaHasta: this.datePipe.transform(new Date(this.fechaHasta), 'dd/MM/yyyy')
      }


      return this.mercPendEntregarService.listadoMercPendEntregar(filtro).subscribe(respuesta => {
        this.listadoMercPendEntregar = respuesta.datos.listado;
        this.totales = respuesta.datos.totales;

        this.cargando = false;
      }, () => {
        this.cargando = false;
      });
    }
  }

  // funcion que muestra el detalle de un movimiento seleccionado
  verDetalle(movimiento: MovimientoMercPendEntregar) {

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

  // funcion encargada de capturar el valor de la cuenta
  seleccionarCuenta(cuentaSeleccionada?: string) {
    this.cuenta = cuentaSeleccionada;
    this.establecerFiltrosPorDefecto();
    this.cargarListado();
  }

  // funcion que acomoda los filtros a default
  establecerFiltrosPorDefecto() {
    let sieteDiasAtras: Date = new Date();
    sieteDiasAtras.setDate(sieteDiasAtras.getDate() - 7);
    this.fechaDesde = sieteDiasAtras.toISOString();

    this.fechaHasta = (new Date()).toISOString();
  }

  // funcion encargada de limpiar para nueva generacion
  limpiar() {
    this.listadoMercPendEntregar = [];
    this.totales = null;
  }
}
