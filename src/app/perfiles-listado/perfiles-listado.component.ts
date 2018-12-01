import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent } from '@angular/material';
import { PerfilesEdicionComponent } from '../perfiles-edicion/perfiles-edicion.component';
import { ListadoPaginado } from '../interfaces/varios/listado-paginado';
import { PerfilesService } from '../services/perfiles/perfiles.service';
import { FiltroGenericoLista } from '../interfaces/varios/filtro-generico-lista';
import { AuthenticationService } from '../services/security/authentication.service';
import { UserAuth } from '../models/security/user';
import { PerfilOperacionesComponent } from '../perfil-operaciones/perfil-operaciones.component';
import { PerfilBasico } from '../interfaces/perfiles/perfil-basico';

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
    this.dialog.open(PerfilesEdicionComponent);
  }

  // despliega el formulario que muestra un menu de operaciones sobre el perfil seleccionado
  verOperaciones(perfil: PerfilBasico) {
    const dialogRef = this.dialog.open(PerfilOperacionesComponent, {
      data: perfil
    });

    dialogRef.afterClosed().subscribe(
      data => this.cargarListado(this.pageEvent)
    );
  }

  // lista los perfiles registrados en el sistema
  cargarListado(event?: PageEvent) {
    this.cargando = true;

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
