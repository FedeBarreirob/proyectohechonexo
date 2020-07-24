import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CtacteAplicadaService } from '../../../../services/ctacte-aplicada/ctacte-aplicada.service';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { MatDialog } from '@angular/material';
import { ResumenComprobanteDialogCobrosComponent } from './resumen/resumen-comprobante-dialog-cobros/resumen-comprobante-dialog-cobros.component';

@Component({
  selector: 'app-billetera-cobrar',
  templateUrl: './billetera-cobrar.component.html',
  styleUrls: ['./billetera-cobrar.component.css']
})
export class BilleteraCobrarComponent implements OnInit, OnDestroy {

  esCelular: boolean;
  conceptosACobrar: any;
  destroy$: Subject<any> = new Subject<any>();
  cargando: boolean = false;
  cuenta: EntidadAlg;
  vencimientoACobrarSeleccionado$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  cobrosProgramados$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private deviceService: DeviceDetectorService,
    private ctacteAplicadaService: CtacteAplicadaService,
    private cuentaService: CuentaAlgService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();

    this.cuentaService.cuentaAlgSeleccionadaV2$.asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        cuenta => {
          this.cuenta = cuenta;
          this.cargarConceptosACobrar();
        }
      );

    if (this.cuentaService.cuentaAlgSeleccionadaV2$.getValue()) {
      this.cuenta = this.cuentaService.cuentaAlgSeleccionadaV2$.getValue();
      this.cargarConceptosACobrar();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Carga los conceptos a cobrar
   */
  cargarConceptosACobrar() {
    if (this.cargando == false && this.cuenta) {

      this.cargando = true;

      this.ctacteAplicadaService.comprobantesAgrupadosPorVencimiento(this.cuenta.id.codigo)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {

            if (respuesta.exito == true) {
              this.conceptosACobrar = respuesta.datos;
            }
          },
          error => {
            console.log(error);
            this.cargando = false;
          },
          () => this.cargando = false
        );
    }
  }

  /**
   * Selecciona un vencimiento a cobrar
   * @param vencimientoACobrar 
   */
  seleccionarVencimientoACobrar(vencimientoACobrar: any) {
    this.vencimientoACobrarSeleccionado$.next(vencimientoACobrar);
  }

  /**
   * Muestra el resumen del proceso de creación de la solicitud de cobro
   * @param solicitudCreada 
   */
  mostrarResumen(solicitudCreada: any) {
    this.dialog.open(ResumenComprobanteDialogCobrosComponent, {
      data: solicitudCreada,
      maxWidth: '100vw',
        width: '100%',
        maxHeight: '100vh',
        height: '100%'
    });
  }
}
