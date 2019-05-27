import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('menuNotificaciones') public sidenav: MatSidenav;

  cargando$: Subject<boolean> = new Subject<boolean>();
  cargandoCtacte: boolean = false;
  cargandoIndicadorContratos: boolean = false;
  cargandoIndicadorEntregasRecientes: boolean = false;
  cargandoIndicadorVentasRecientes: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Funcion encargada de mostrar u ocultar el sidebar que contiene las notificaciones
   */
  mostrarOcultarNotificaciones() {
    this.sidenav.toggle();
  }

  /**
   * Indica el estado de carga del indicador de Cuenta corriente
   * @param cargando Indica estado de carga
   */
  esCargandoCtaCte(cargando: boolean) {
    this.cargandoCtacte = cargando;

    this.mostrarIndicadorLoading();
  }

  /**
   * Indica el estado de carga del indicador de Contratos
   * @param cargando Indica estado de carga
   */
  esCargandoIndicadorContratos(cargando: boolean) {
    this.cargandoIndicadorContratos = cargando;

    this.mostrarIndicadorLoading();
  }

  /**
   * Indica el estado de carga del indicador de Entregas recientes
   * @param cargando Indica estado de carga
   */
  esCargandoIndicadorEntregasRecientes(cargando: boolean) {
    this.cargandoIndicadorEntregasRecientes = cargando;

    this.mostrarIndicadorLoading();
  }

  /**
   * Indica el estado de carga del indicador de Ventas recientes
   * @param cargando Indica estado de carga
   */
  esCargandoIndicadorVentasRecientes(cargando: boolean) {
    this.cargandoIndicadorVentasRecientes = cargando;

    this.mostrarIndicadorLoading();
  }

  /**
   * Muestra el indicador de carga mientras haya un proceso ejecutándose
   */
  private mostrarIndicadorLoading() {

    let hayProcesosEnEjecucion = this.cargandoCtacte == true ||
      this.cargandoIndicadorContratos == true || this.cargandoIndicadorEntregasRecientes == true
      || this.cargandoIndicadorVentasRecientes == true;

    if (hayProcesosEnEjecucion == true) {
      this.cargando$.next(true);
    } else {
      this.cargando$.next(false);
    }
  }
}
