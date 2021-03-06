import { Component, OnInit, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { EntregasService } from '../../../../services/entregas/entregas.service';
import { takeUntil } from 'rxjs/operators';
import { KilosAPipe } from '../../../../pipes/kilos-a.pipe';
import { PrecioTNAPipe } from '../../../../pipes/precio-tna.pipe';
import { MatDialog } from '@angular/material';
import { PreciosDeGranosComponent } from '../../../listados/billetera/billetera-pagar/precios-de-granos/precios-de-granos.component';

@Component({
  selector: 'app-pagar-con-canje-disponible',
  templateUrl: './pagar-con-canje-disponible.component.html',
  styleUrls: ['./pagar-con-canje-disponible.component.css'],
  providers: [KilosAPipe, PrecioTNAPipe]
})
export class PagarConCanjeDisponibleComponent implements OnInit, OnDestroy {

  @Input()
  disponible: any;

  @Input()
  totalEvent$: BehaviorSubject<number>;

  @Input()
  unidadMedida: string;

  @Output()
  importeCalculadoChange: EventEmitter<any> = new EventEmitter<any>();

  cargando: boolean = false;
  destroy$: Subject<any> = new Subject<any>();
  precioEspecie: any;
  PESOS: string = 'P';
  BOLSA_DE_ROSARIO: string = 'BPR';
  cantidadNecesariaParaSaldarConCanje: number;

  stockAFijar: number = 0;
  stockAPesificar: number = 0;

  constructor(
    private entregasService: EntregasService,
    private kilosAPipe: KilosAPipe,
    private precioTNAPipe: PrecioTNAPipe,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.cargarPrecioEspecie();

    if (this.totalEvent$) {
      this.totalEvent$.subscribe(() => this.actualizarCantidadNecesariaParaCanjear());
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Carga el precio de la especie registrado en algoritmo 
   * para usarlo como referencia en los calculos
   */
  cargarPrecioEspecie() {
    if (this.cargando == false) {
      this.cargando = true;

      let especies = [this.disponible.especieCodigo];
      let monedas = [this.PESOS];

      this.entregasService.mercadoDeGranoPrecios(especies, monedas, this.BOLSA_DE_ROSARIO)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {
            if (respuesta.exito == true) {

              if (respuesta.datos && respuesta.datos.length > 0) {
                this.precioEspecie = respuesta.datos[0];
                this.actualizarCantidadNecesariaParaCanjear();
              }

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
   * Actualiza la cantidad necesaria del cereal requerido para saldar el importe total según
   * el precio 
   */
  actualizarCantidadNecesariaParaCanjear() {

    try {
      if (this.totalEvent$ && this.totalEvent$.getValue() && this.unidadMedida && this.precioEspecie) {
        let total: number = this.totalEvent$.getValue();

        if (this.precioTNAPipe.transform(this.precioEspecie.precio, this.unidadMedida) != 0) {
          this.cantidadNecesariaParaSaldarConCanje = total / this.precioTNAPipe.transform(this.precioEspecie.precio, this.unidadMedida);
        } else {
          this.cantidadNecesariaParaSaldarConCanje = null;
        }

      } else {
        this.cantidadNecesariaParaSaldarConCanje = null;
      }
    } catch (e) {
      console.log(e);
      this.cantidadNecesariaParaSaldarConCanje = null;
    }
  }

  /**
   * Retorna el saldo disponible del stock a fijar
   */
  get disponibleStockAFijar() {
    return this.kilosAPipe.transform(this.disponible.kgDisponibles, this.unidadMedida) - this.stockAFijar;
  }

  /**
   * Retorna el saldo disponible del stock a pesificar
   */
  get disponibleStockAPesificar() {
    return this.kilosAPipe.transform(this.disponible.kgDisponibles, this.unidadMedida) - this.stockAPesificar;
  }

  /**
   * Calcula el total en pesos equivalente al stock a fijar indicado
   */
  notificarImporteCalculado() {
    if (this.stockAFijar > 0) {
      this.disponible.total = this.stockAFijar * this.precioTNAPipe.transform(this.precioEspecie.precio, this.unidadMedida);
    } else {
      this.disponible.total = 0;
    }

    this.importeCalculadoChange.emit();
  }

  /**
   * Muestra la pizarra con el precio de los granos
   */
  mostrarPizarra() {
    let especies = [this.disponible.especieCodigo];

    this.dialog.open(PreciosDeGranosComponent, {
      data: {
        especies: especies,
        unidadMedida: this.unidadMedida
      },
      maxWidth: '90vw',
      width: '90%',
      maxHeight: '75vh',
      height: '75%'
    });
  }
}
