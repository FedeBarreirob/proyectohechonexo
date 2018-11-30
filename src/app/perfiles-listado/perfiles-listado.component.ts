import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent } from '@angular/material';
import { PerfilesEdicionComponent } from '../perfiles-edicion/perfiles-edicion.component';
import { ListadoPaginado } from '../interfaces/varios/listado-paginado';
import { PerfilesService } from '../services/perfiles/perfiles.service';
import { FiltroGenericoLista } from '../interfaces/varios/filtro-generico-lista';
import { AuthenticationService } from '../services/security/authentication.service';
import { UserAuth } from '../models/security/user';

@Component({
  selector: 'app-perfiles-listado',
  templateUrl: './perfiles-listado.component.html',
  styleUrls: ['./perfiles-listado.component.css']
})
export class PerfilesListadoComponent implements OnInit {

  private listaPaginada: ListadoPaginado = {
    listado: [],
    cantidadTotalRegistros: 0,
    cantidadPorPagina: 0,
    paginaActual: 0
  };
  private cargando: boolean;
  private usuarioLogueado: UserAuth;
  private filtro: FiltroGenericoLista = {
    filtro: "",
    numeroPagina: 1,
    cantPorPagina: 25
  };

  // paginacion
  pageEvent: PageEvent;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private perfilService: PerfilesService
  ) {
    this.usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();
  }

  ngOnInit() {
    this.cargando = false;
  }

  // despliega el formulario para crear un nuevo perfil
  nuevoPerfil() {
    this.dialog.open(PerfilesEdicionComponent, { panelClass: 'mat-dialog-container' });
  }

  // lista los perfiles registrados en el sistema
  cargarListado(event?: PageEvent) {
    this.cargando = true;

    console.log(event);

    if (event != null) {
      this.filtro.numeroPagina = event.pageIndex + 1;
      this.filtro.cantPorPagina = event.pageSize;
    }

    this.perfilService.listadoPaginado(this.filtro, this.usuarioLogueado.token).subscribe(
      respuesta => {
        this.listaPaginada = <ListadoPaginado>respuesta.datos;
        this.cargando = false;
      },
      error => {
        this.cargando = false;
      }
    );

    return event;
  }
}
