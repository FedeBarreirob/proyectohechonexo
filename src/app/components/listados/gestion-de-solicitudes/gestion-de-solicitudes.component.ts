import { Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subject, BehaviorSubject } from 'rxjs';
import { EntidadAlg } from '../../../interfaces/perfiles/entidad-alg';
import { MatSidenav, MAT_DIALOG_DATA } from '@angular/material';
import { EntregasService } from 'src/app/services/entregas/entregas.service';

@Component({
  selector: 'app-gestion-de-solicitudes',
  templateUrl: './gestion-de-solicitudes.component.html',
  styleUrls: ['./gestion-de-solicitudes.component.css']
})
export class GestionDeSolicitudesComponent implements OnInit, OnDestroy {
  

  @ViewChild('menuSolicitudes') public sidenav: MatSidenav;

  destroy$: Subject<any> = new Subject<any>();
  esCelular: boolean;
  cuenta: EntidadAlg;
  observerFiltro$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  especie: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private deviceService: DeviceDetectorService,
    private EntregasService: EntregasService
  ) { 
    this.cuenta = data.cuenta
    this.especie = data.especie
   }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();

  }

  cargarDatosEntrega(){

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  // funcion encargada de mostrar u ocultar los filtros
  mostrarOcultarFiltros() {
    this.sidenav.toggle();
  }

  // funcion que ejecuta la carga del listado
  cargarListado(filtro: any) {
    this.observerFiltro$.next(filtro);
  }

  /**
   * Arma un filtro por defecto y ejecuta el listado
   */
  cargarListadoPorDefecto() {
    let filtro = {
      cuenta: this.cuenta.id.codigo,
      aPagar: true
    }

    this.cargarListado(filtro);
  }

}
