import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CtacteAplicadaService } from '../../../../services/ctacte-aplicada/ctacte-aplicada.service';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';

@Component({
  selector: 'app-billetera-cobrar',
  templateUrl: './billetera-cobrar.component.html',
  styleUrls: ['./billetera-cobrar.component.css']
})
export class BilleteraCobrarComponent implements OnInit, OnDestroy {

  esCelular: boolean;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isOptional = false;
  conceptosACobrar: any;
  destroy$: Subject<any> = new Subject<any>();
  cargando: boolean = false;
  cuenta: EntidadAlg;

  constructor(
    private deviceService: DeviceDetectorService,
    private _formBuilder: FormBuilder,
    private ctacteAplicadaService: CtacteAplicadaService,
    private cuentaService: CuentaAlgService
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ''
    });

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
}
