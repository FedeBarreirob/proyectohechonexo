import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { CuentasBancariasService } from '../../../services/cuentas-bancarias/cuentas-bancarias.service';
import { EntidadAlg } from '../../../interfaces/perfiles/entidad-alg';
import { CuentaAlgService } from '../../../services/observers/cuentas-alg/cuenta-alg.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CuentaBancariaEstado } from '../../../enums/cuenta-bancaria-estado.enum';
import { MatDialog } from '@angular/material';
import { BilleteraCobrarCuentaComponent } from '../../listados/billetera/billetera-cobrar/billetera-cobrar-cuenta/billetera-cobrar-cuenta.component';

@Component({
  selector: 'app-cuenta-bancaria-selector',
  templateUrl: './cuenta-bancaria-selector.component.html',
  styleUrls: ['./cuenta-bancaria-selector.component.css']
})
export class CuentaBancariaSelectorComponent implements OnInit, OnDestroy {

  @Output()
  cuentaSeleccionadaEvent: EventEmitter<any> = new EventEmitter<any>();

  cuenta: EntidadAlg;
  destroy$: Subject<any> = new Subject<any>();
  cargando: boolean = false;
  cuentasBancarias: Array<any>;
  cuentaBancariaEstado = CuentaBancariaEstado;
  cuentaSeleccionada: any;

  constructor(
    private cuentasBancariasService: CuentasBancariasService,
    private cuentaService: CuentaAlgService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.cuentaService.cuentaAlgSeleccionadaV2$.asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        cuenta => {
          this.cuenta = cuenta;
          this.cargarCuentasBancarias();
        }
      );

    if (this.cuentaService.cuentaAlgSeleccionadaV2$.getValue()) {
      this.cuenta = this.cuentaService.cuentaAlgSeleccionadaV2$.getValue();
      this.cargarCuentasBancarias();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Carga las cuentas bancarias vinculadas a la cuenta actual
   */
  cargarCuentasBancarias() {
    if (this.cargando == false && this.cuenta) {

      this.cargando = true;

      this.cuentasBancariasService.cuentasBancarias(this.cuenta.id.codigo)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {

            if (respuesta.exito == true) {
              this.cuentasBancarias = respuesta.datos;
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
   * Selecciona y notifica la cuenta bancaria seleccionada
   * @param cuentaSeleccionada 
   */
  seleccionarCuenta(cuentaSeleccionada: any) {
    this.cuentaSeleccionada = cuentaSeleccionada;
    this.cuentaSeleccionadaEvent.emit(this.cuentaSeleccionada);
  }

  /**
   * Abre el dialogo para agregar nueva cuenta
   */
  agregarCuenta() {
    let dialogRef = this.dialog.open(BilleteraCobrarCuentaComponent, {
      data: this.cuenta,
      maxWidth: '100vw',
      width: '100%',
      maxHeight: '100vh',
      height: '100%'
    });

    dialogRef.afterClosed().subscribe(cuentaCreada => {
      if (cuentaCreada == true) {
        this.cargarCuentasBancarias();
      }
    });
  }
}
