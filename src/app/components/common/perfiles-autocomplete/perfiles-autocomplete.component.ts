import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { PerfilesService } from '../../../services/perfiles/perfiles.service';
import { Subject } from 'rxjs';
import { FiltroGenericoLista } from '../../../interfaces/varios/filtro-generico-lista';
import { takeUntil } from 'rxjs/operators';
import { PerfilBasicoInfoPersonal } from '../../../interfaces/perfiles/perfil-basico-informacion-personal';

@Component({
  selector: 'app-perfiles-autocomplete',
  templateUrl: './perfiles-autocomplete.component.html',
  styleUrls: ['./perfiles-autocomplete.component.css']
})
export class PerfilesAutocompleteComponent implements OnInit, OnDestroy {

  @Input()
  disabled: boolean = false;

  @Input()
  clearAll$: Subject<any>;

  @Output()
  select: EventEmitter<PerfilBasicoInfoPersonal> = new EventEmitter<PerfilBasicoInfoPersonal>();

  @ViewChild('auto') auto;

  destroy$: Subject<any> = new Subject<any>();
  keyword = 'nombre';
  data: Array<PerfilBasicoInfoPersonal> = [];
  cargando: boolean = false;

  constructor(private perfilService: PerfilesService) { }

  ngOnInit() {
    if (this.clearAll$) {
      this.clearAll$.subscribe(() => {
        this.destroy$.next();
        this.auto.clear();
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  loadData(filter: string) {
    this.destroy$.next();

    this.cargando = true;
    let filtro = this.filtroSegunTermino(filter);

    this.perfilService.listadoPaginado(filtro)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        respuesta => {
          if (respuesta.exito == true && respuesta.datos.listado && respuesta.datos.listado.length > 0) {
            this.data = respuesta.datos.listado.map(item => item.informacionPersonal);
          } else {
            this.data = [];
          }

        },
        error => {
          console.log(error);
          this.cargando = false;
        },
        () => this.cargando = false
      );
  }

  /**
   * Devuelve el filtro para enviarlo al servicio
   * @param termino 
   */
  filtroSegunTermino(termino: any): FiltroGenericoLista {
    try {
      return {
        filtro: termino.valueOf(),
        numeroPagina: 1,
        cantPorPagina: 10,
        fullData: true
      };
    } catch (e) {
      return {
        filtro: "",
        numeroPagina: 1,
        cantPorPagina: 10,
        fullData: true
      };
    }
  }

  selectEvent(item) {
    this.select.emit(item);
  }

  onChangeSearch(val: string) {
    this.loadData(val);
  }

  onFocused(e) { }
}
