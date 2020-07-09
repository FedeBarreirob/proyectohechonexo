import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSidenav } from '@angular/material';
import { EntidadAlg } from '../../../../../../interfaces/perfiles/entidad-alg';
import { EntregasService } from '../../../../../../services/entregas/entregas.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-definicion-de-boletos-afijar',
  templateUrl: './definicion-de-boletos-afijar.component.html',
  styleUrls: ['./definicion-de-boletos-afijar.component.css']
})
export class DefinicionDeBoletosAFijarComponent implements OnInit, OnDestroy {

  @ViewChild('menuDefiniciones') public sidenav: MatSidenav;

  especie: string;
  especieDescripcion: string;
  unidadMedida: string;
  cuenta: EntidadAlg;
  destroy$: Subject<any> = new Subject<any>();
  esCelular: boolean;
  observerFiltro$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  cargando: boolean = false;
  boletosAFijar: Array<any>;
  totalMercaderiaACanjear$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  fijaciones: Array<any> = [];
  stockAFijar: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DefinicionDeBoletosAFijarComponent>,
    private entregasService: EntregasService,
    private deviceService: DeviceDetectorService
  ) {
    this.especie = data.especie;
    this.cuenta = data.cuenta;
    this.especieDescripcion = data.especieDescripcion;
    this.unidadMedida = data.unidadMedida;
    this.stockAFijar = data.stockAFijar;
  }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();

    this.observerFiltro$.subscribe(filtro => this.cargarListado(filtro));
    this.cargarListado(null);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Función encargada de cerrar el dialog
   */
  salir() {
    this.dialogRef.close();
  }

  // funcion encargada de mostrar u ocultar los filtros
  mostrarOcultarFiltros() {
    this.sidenav.toggle();
  }

  // funcion que ejecuta la carga del listado
  cargarListado(filtro: any) {

    let filtroAAplicar = (filtro) ? filtro : this.filtroPorDefecto;

    if (this.cargando == false) {

      this.cargando = true;
      this.boletosAFijar = null;

      this.entregasService.listadocontratosConDispPendFijarPesificar(filtroAAplicar)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {
            if (respuesta.exito == true && respuesta.datos && respuesta.datos.length > 0) {
              this.boletosAFijar = respuesta.datos.filter((boleto: any) => boleto.kgDisponiblesPendientesDeFijar > 0);
            }
          },
          error => {
            console.log(error);
            this.cargando = false;
          },
          () => this.cargando = false);
    }
  }

  get filtroPorDefecto() {
    return {
      cuenta: this.cuenta.id.codigo,
      especie: this.especie
    }
  }

  /**
   * Agrega, quita o actualiza una fijación dada
   * @param fijacion 
   */
  agregarQuitarOActualizarBoletoFijadoSeleccionado(fijacion: any) {
    if (fijacion) {

      if (fijacion.boletoSeleccionado == true) {

        let unaFijacion = this.fijaciones.find(unaFijacion => unaFijacion.boleto.contratoAlgId == fijacion.boleto.contratoAlgId);
        if (unaFijacion) {
          unaFijacion = Object.assign(unaFijacion, fijacion);
        } else {
          this.fijaciones.push(fijacion);
        }

      } else {
        this.fijaciones = this.fijaciones.filter(unaFijacion => unaFijacion.boleto.contratoAlgId != fijacion.boleto.contratoAlgId);
      }

    }

    this.actualizarTotalizador();
  }

  /**
   * Función encargada de actualizar el totalizador
   */
  actualizarTotalizador() {
    if (this.fijaciones && this.fijaciones.length > 0) {

      let total: number = this.fijaciones
        .map(fijacion => fijacion.stockAFijar)
        .reduce((acum, current) => Number.parseFloat(acum) + Number.parseFloat(current), 0);

      this.totalMercaderiaACanjear$.next(total);
    } else {
      this.totalMercaderiaACanjear$.next(0);
    }
  }
}
