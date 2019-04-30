import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatDialog } from '@angular/material';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cuenta-corriente',
  templateUrl: './cuenta-corriente.component.html',
  styleUrls: ['./cuenta-corriente.component.css']
})
export class CuentaCorrienteComponent implements OnInit {

  @ViewChild('menuFiltro') public sidenav: MatSidenav;

  public cuenta: EntidadAlg;
  esCelular: boolean;
  observerFiltro$ = new Subject<any>();
  cargando: Boolean = false;
  
  constructor(
    public dialog: MatDialog,
    private cuentaAlgService: CuentaAlgService,
    private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();

    this.cuentaAlgService.cuentaSeleccionada$.subscribe(
      cuentaAlg => this.seleccionarCuenta(cuentaAlg)
    );
  }

  // funcion encargada de capturar el valor de la cuenta
  seleccionarCuenta(cuentaSeleccionada?: EntidadAlg) {
    this.cuenta = cuentaSeleccionada;
  }

  // funcion encargada de mostrar u ocultar los filtros
  mostrarOcultarFiltros() {
    this.sidenav.toggle();
  }

  // funcion que ejecuta la carga del listado
  cargarListado(filtro: any) {
    this.observerFiltro$.next(filtro);
  }

  // funcion que se encarga de cambiar el estado de cargando
  cambiarEstadoCargando(cargando: boolean) {
    this.cargando = cargando;
  }
}
