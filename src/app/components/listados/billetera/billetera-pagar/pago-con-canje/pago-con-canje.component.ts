import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { EntidadAlg } from '../../../../../interfaces/perfiles/entidad-alg';
import { ContratosService } from '../../../../../services/contratos/contratos.service';
import { takeUntil } from 'rxjs/operators';

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

  disponibles: Array<any>;
  cargando: boolean = false;
  destroy$: Subject<any> = new Subject<any>();

  constructor(private contratosService: ContratosService) { }

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
}
