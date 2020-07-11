import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { MatSidenav, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { EntidadAlg } from '../../../../../../interfaces/perfiles/entidad-alg';
import { Subject, BehaviorSubject } from 'rxjs';
import { EntregasService } from '../../../../../../services/entregas/entregas.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { takeUntil } from 'rxjs/operators';
import { ContratoTipoPesificacion } from '../../../../../../enums/contrato-tipo-pesificacion.enum';

@Component({
  selector: 'app-definicion-de-boletos-apesificar',
  templateUrl: './definicion-de-boletos-apesificar.component.html',
  styleUrls: ['./definicion-de-boletos-apesificar.component.css']
})
export class DefinicionDeBoletosAPesificarComponent implements OnInit, OnDestroy {

  @ViewChild('menuDefiniciones') public sidenav: MatSidenav;

  especie: string;
  especieDescripcion: string;
  unidadMedida: string;
  cuenta: EntidadAlg;
  destroy$: Subject<any> = new Subject<any>();
  esCelular: boolean;
  observerFiltro$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  cargando: boolean = false;
  boletosAPesificar: Array<any>;
  totalMercaderiaACanjear$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  pesificaciones: Array<any> = [];
  stockAPesificar: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DefinicionDeBoletosAPesificarComponent>,
    private entregasService: EntregasService,
    private deviceService: DeviceDetectorService,
    private snackBar: MatSnackBar
  ) {
    this.especie = data.especie;
    this.cuenta = data.cuenta;
    this.especieDescripcion = data.especieDescripcion;
    this.unidadMedida = data.unidadMedida;
    this.stockAPesificar = data.stockAPesificar;

    if (data.pesificaciones && data.pesificaciones.length > 0) {
      this.pesificaciones = data.pesificaciones;
    }
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
      this.boletosAPesificar = null;

      this.entregasService.listadocontratosConDispPendFijarPesificar(filtroAAplicar)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {
            if (respuesta.exito == true && respuesta.datos && respuesta.datos.length > 0) {
              this.boletosAPesificar = respuesta.datos.filter((boleto: any) => boleto.kgDisponiblesPendientesDePesificar > 0);
              this.agregarInformacionDePesificacionPrevia();
              this.actualizarTotalizador();
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
   * Agrega, quita o actualiza una pesificació  dada
   * @param pesificacion 
   */
  agregarQuitarOActualizarBoletoPesificadoSeleccionado(pesificacion: any) {
    if (pesificacion) {

      if (pesificacion.boletoSeleccionado == true) {

        let unaPesificacion = this.pesificaciones.find(unaPesificacion => unaPesificacion.boleto.contratoAlgId == pesificacion.boleto.contratoAlgId);
        if (unaPesificacion) {
          unaPesificacion = Object.assign(unaPesificacion, pesificacion);
        } else {
          this.pesificaciones.push(pesificacion);
        }

      } else {
        this.pesificaciones = this.pesificaciones.filter(unaPesificacion => unaPesificacion.boleto.contratoAlgId != pesificacion.boleto.contratoAlgId);
      }

    }

    this.actualizarTotalizador();
  }

  /**
   * Función encargada de actualizar el totalizador
   */
  actualizarTotalizador() {
    if (this.pesificaciones && this.pesificaciones.length > 0) {

      let totalPesificacionParcial: number = this.pesificaciones
        .filter(pesificacion => pesificacion.tipoPesificacion == ContratoTipoPesificacion.PARCIAL)
        .map(pesificacion => pesificacion.stockAPesificar)
        .reduce((acum, current) => Number.parseFloat(acum) + Number.parseFloat(current), 0);

      let totalPesificacionTotal: number = this.pesificaciones
        .filter(pesificacion => pesificacion.tipoPesificacion == ContratoTipoPesificacion.TOTAL)
        .map(pesificacion => pesificacion.boleto.kgDisponiblesPendientesDePesificar)
        .reduce((acum, current) => Number.parseFloat(acum) + Number.parseFloat(current), 0);

      let total = totalPesificacionParcial + totalPesificacionTotal;

      this.totalMercaderiaACanjear$.next(total);
    } else {
      this.totalMercaderiaACanjear$.next(0);
    }
  }

  /**
   * Agrega al listado de boletos, la informacion de pesificación configurada anteriormente. Esto es para que
   * si realiza una nueva búsqueda, el resultado de boletos muestre nuevamente la información de pesificaciones
   * seteadas previamente.
   */
  agregarInformacionDePesificacionPrevia() {
    if (this.pesificaciones && this.pesificaciones.length > 0 && this.boletosAPesificar && this.boletosAPesificar.length > 0) {
      this.boletosAPesificar.forEach(boleto => {

        let unaPesificacion = this.pesificaciones.find(unaPesificacion => unaPesificacion.boleto.contratoAlgId == boleto.contratoAlgId);

        if (unaPesificacion) {
          let unaPesificacionSinInfoDeBoleto = Object.assign({}, unaPesificacion);
          unaPesificacionSinInfoDeBoleto.boleto = null;
          boleto.pesificacionPrevia = unaPesificacionSinInfoDeBoleto;
        }

      });
    }
  }

  /**
   * Entrega los boletos definidos
   */
  definirBoletos() {
    if (this.stockSeleccionadoSuficiente == true) {
      this.dialogRef.close(this.pesificaciones);
    } else {
      this.openSnackBar("La cantidad de granos indicados es insuficiente");
    }
  }

  /**
   * Verifica si la cantdad de mercadería a fijar seleccionada, satisface la cantidad requerida
   */
  get stockSeleccionadoSuficiente(): boolean {
    let total: number = this.totalMercaderiaACanjear$.getValue();

    if (total >= this.stockAPesificar) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Shows a notification
   * @param message 
   */
  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }
}
