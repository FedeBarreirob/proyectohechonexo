import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MovimientoCtaCteAplicada } from '../../../../interfaces/ctacte-aplicada/listado-ctacte-aplicada';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { InfoCtaCte } from '../../../../enums/info-cta-cte.enum';
import { Subject } from 'rxjs';
import { CtacteAplicadaService } from '../../../../services/ctacte-aplicada/ctacte-aplicada.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cuenta-corriente-aplicada-lista-desktop',
  templateUrl: './cuenta-corriente-aplicada-lista-desktop.component.html',
  styleUrls: ['./cuenta-corriente-aplicada-lista-desktop.component.css']
})
export class CuentaCorrienteAplicadaListaDesktopComponent implements OnInit, OnDestroy {

  @Input()
  cuenta: EntidadAlg;

  @Output()
  seleccionMovimiento: EventEmitter<any> = new EventEmitter<any>();

  infoCtaCte: any = InfoCtaCte;
  listado: Array<MovimientoCtaCteAplicada> = [];
  filtro: any;
  cargando: boolean = false;
  destroy$: Subject<any> = new Subject<any>();

  // filtros extendidos
  aCobrar: boolean = false;
  aPagar: boolean = false;
  vencido: boolean = false;
  AVencer: boolean = false;

  constructor(private ctacteAplicadaService: CtacteAplicadaService) { }

  ngOnInit() {
    this.cargarListado();
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

      let filtroPaginado: any = (this.filtro) ? this.filtro : this.filtroPorDefecto();
      filtroPaginado.totales = true;
      filtroPaginado.paginado = false;
      filtroPaginado.ordenado = false;
      filtroPaginado.aCobrar = this.aCobrar;
      filtroPaginado.aPagar = this.aPagar;
      filtroPaginado.vencido = this.vencido;
      filtroPaginado.AVencer = this.AVencer;

      this.ctacteAplicadaService.listadoCtaCte(filtroPaginado)
        .pipe(takeUntil(this.destroy$))
        .subscribe(respuesta => {
          this.listado = respuesta.datos.listado;
          this.cargando = false;
        }, () => {
          this.cargando = false;
        });
    }
  }

  /**
   * Retorna filtro por defecto
   */
  filtroPorDefecto(): any {
    return {
      cuenta: this.cuenta.id.codigo
    };
  }

  // funcion encargada de limpiar para nueva generacion de listado
  private limpiar() {
    this.listado.splice(0, this.listado.length);
  }
}
