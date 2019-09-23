import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { InfoCtaCte } from '../../../../enums/info-cta-cte.enum';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { MovimientoCtaCte } from '../../../../interfaces/ctacte/listado.ctacte';
import { Subject } from 'rxjs';
import { CtacteService } from '../../../../services/ctacte/ctacte.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cuenta-corriente-lista-desktop',
  templateUrl: './cuenta-corriente-lista-desktop.component.html',
  styleUrls: ['./cuenta-corriente-lista-desktop.component.css']
})
export class CuentaCorrienteListaDesktopComponent implements OnInit, OnDestroy {

  @Input()
  cuenta: EntidadAlg;

  @Output()
  seleccionMovimiento: EventEmitter<any> = new EventEmitter<any>();

  infoCtaCte: any = InfoCtaCte;
  listado: Array<MovimientoCtaCte> = [];
  filtro: any;
  cargando: boolean = false;
  destroy$: Subject<any> = new Subject<any>();

  // filtros extendidos
  aCobrar: boolean = false;
  aPagar: boolean = false;
  vencido: boolean = false;
  AVencer: boolean = false;

  constructor(private ctacteService: CtacteService) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Función encargada de ejecutar 
   * @param filtro 
   */
  aplicar(filtro: any) {
    this.filtro = filtro;
    this.cargarListado();
  }

  /**
   * Función encargada de cargar el listado de entregas
   */
  cargarListado() {
    if (!this.cargando) {
      this.cargando = true;

      this.limpiar();

      let filtroPaginado: any = this.filtro;
      filtroPaginado.totales = true;
      filtroPaginado.paginado = false;
      filtroPaginado.ordenado = false;
      filtroPaginado.aCobrar = this.aCobrar;
      filtroPaginado.aPagar = this.aPagar;
      filtroPaginado.vencido = this.vencido;
      filtroPaginado.AVencer = this.AVencer;

      this.ctacteService.listadoCtaCte(filtroPaginado)
        .pipe(takeUntil(this.destroy$))
        .subscribe(respuesta => {
          this.listado = respuesta.datos.listado;
          this.cargando = false;
        }, () => {
          this.cargando = false;
        });
    }
  }

  // funcion encargada de limpiar para nueva generacion de listado
  private limpiar() {
    this.listado.splice(0, this.listado.length);
  }
}
