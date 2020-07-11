import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { EntidadAlg } from '../../../../../interfaces/perfiles/entidad-alg';
import { ContratosService } from '../../../../../services/contratos/contratos.service';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { PreciosDeGranosComponent } from '../precios-de-granos/precios-de-granos.component';

@Component({
  selector: 'app-pago-con-canje',
  templateUrl: './pago-con-canje.component.html',
  styleUrls: ['./pago-con-canje.component.css']
})
export class PagoConCanjeComponent implements OnInit, OnDestroy {

  @Input()
  totalEvent$: BehaviorSubject<number>;

  @Input()
  cuenta: EntidadAlg;

  @Input()
  unidadMedida: string;

  @Input()
  disponiblesSeleccionados$: BehaviorSubject<Array<any>>;

  disponibles: Array<any>;
  cargando: boolean = false;
  destroy$: Subject<any> = new Subject<any>();
  totalImporteCanje$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private contratosService: ContratosService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.cargarDisponible();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  cargarDisponible() {
    if (this.cargando == false && this.cuenta) {
      this.cargando = true;

      this.contratosService.contratosKgDisponiblesParaCanjePorEspecie(this.cuenta.id.codigo)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {
            if (respuesta.exito == true) {
              this.disponibles = respuesta.datos;
            }
          },
          error => {
            console.log(error);
            this.cargando = false;
          },
          () => this.cargando = false);
    }
  }

  /**
   * Calcula el importe total obtenido de la sumatoria de los totales de cada especia cuyo importe
   * surge de multiplicar el stock a fijar indicado por el precio de la especie en pizarra
   */
  actualizarTotalImporteCanje() {
    if (this.disponibles && this.disponibles.length > 0) {
      let total = this.disponibles
        .map(disponible => (disponible.total) ? disponible.total : 0)
        .reduce((acum, currernt) => Number.parseFloat(acum) + Number.parseFloat(currernt));

      this.totalImporteCanje$.next(total);
    } else {
      this.totalImporteCanje$.next(0);
    }
  }

  /**
   * Muestra la pizarra con el precio de los granos
   */
  mostrarPizarra() {
    if (this.disponibles && this.disponibles.length > 0) {

      let especies = this.disponibles.map(disponible => disponible.especieCodigo);

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

  /**
   * Actualiza los totales y notifica los disponibles seleccionados
   */
  actualizarTodo() {
    this.actualizarTotalImporteCanje();
    this.notificarDisponiblesSeleccionados();
  }

  /**
   * Notifica los disponibles donde se ha indicado su stock para pagar
   */
  notificarDisponiblesSeleccionados() {
    if (this.disponibles && this.disponibles.length > 0) {
      let disponiblesSeleccionados = this.disponibles.filter(disponible => disponible.total && disponible.total > 0);

      this.disponiblesSeleccionados$.next(disponiblesSeleccionados);
    } else {
      this.disponiblesSeleccionados$.next(null);
    }
  }
}
