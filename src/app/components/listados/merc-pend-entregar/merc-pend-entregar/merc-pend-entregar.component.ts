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

  public listadoMercPendEntregar: Array<MovimientoMercPendEntregar> = [];
  public cargando: boolean;

  public cuenta: string = "484";

  private todosSeleccionados: boolean = false;
  get estanTodosSeleccionados(): boolean {
    for (var i = 0; i < this.listadoMercPendEntregar.length; i++) {
      if (!this.listadoMercPendEntregar[i].seleccionado) {
        this.todosSeleccionados = false;
        return this.todosSeleccionados;
      }
    }

    this.todosSeleccionados = true;
    return this.todosSeleccionados;
  };

  constructor(private mercPendEntregarService: MercPendEntregarService,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.cargando = true;

    let filtro: FiltroMercaderiaPendEntregar = {
      cuenta: this.cuenta,
      fechaDesde: '01/01/2015',
      fechaHasta: '01/02/2015'
    }

    this.mercPendEntregarService.listadoMercPendEntregar(filtro).subscribe(respuesta => {
      if (respuesta.datos && respuesta.datos.listado) {
        this.listadoMercPendEntregar = respuesta.datos.listado;
      }

      this.cargando = false;
    }, () => {
      this.cargando = false;
    });
  }

  seleccionarTodos = function () {
    for (var i = 0; i < this.listadoMercPendEntregar.length; i++) {
      if (!this.listadoMercPendEntregar[i].seleccionado) {
        return false;
      }
    }
  }
}
