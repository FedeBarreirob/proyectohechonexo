import { Component, OnInit } from '@angular/core';
import { ListadoPaginado } from '../../../../interfaces/varios/listado-paginado';
import { UserAuth } from '../../../../models/security/user';
import { FiltroGenericoListaConFiltroId } from '../../../../interfaces/varios/filtro-generico-lista-con-filtroid';
import { PageEvent, MatDialog } from '@angular/material';
import { TercerosService } from '../../../../services/acceso-terceros/terceros.service';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { AccesoTercerosEdicionComponent } from '../acceso-terceros-edicion/acceso-terceros-edicion.component';
import { TerceroBasico } from '../../../../interfaces/acceso-terceros/tercero-basico';
import { AccesoTercerosOperacionesComponent } from '../acceso-terceros-operaciones/acceso-terceros-operaciones.component';

@Component({
  selector: 'app-acceso-terceros',
  templateUrl: './acceso-terceros.component.html',
  styleUrls: ['./acceso-terceros.component.css']
})
export class AccesoTercerosComponent implements OnInit {

  public listaPaginada: ListadoPaginado = {
    listado: [],
    cantidadTotalRegistros: 0,
    cantidadPorPagina: 0,
    paginaActual: 0
  };
  public cargando: boolean;
  private usuarioLogueado: UserAuth;
  public filtro: FiltroGenericoListaConFiltroId = {
    filtro: "",
    numeroPagina: 1,
    cantPorPagina: 25,
    filtroId: 0
  };

  // paginacion
  pageEvent: PageEvent;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(
    private authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private terceroService: TercerosService
  ) {
    this.usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();
  }

  ngOnInit() {
    this.cargando = false;

    // cargar el perfil en el filtro
    let perfil = this.authenticationService.perfilUsuarioLogueado();
    if (perfil != null) {
      this.filtro.filtroId = perfil.informacionPersonal.id;
    }
  }

  // despliega el formulario para crear un nuevo acceso a tercero
  nuevoAccesoATercero() {
    this.dialog.open(AccesoTercerosEdicionComponent);
  }

  // despliega el formulario que muestra un menu de operaciones sobre el acceso seleccionado
  verOperaciones(accesoTercero: TerceroBasico) {
    const dialogRef = this.dialog.open(AccesoTercerosOperacionesComponent, {
      data: accesoTercero
    });

    dialogRef.afterClosed().subscribe(
      data => this.cargarListado(this.pageEvent)
    );
  }

  // lista los accesos a terceros registrados en el sistema
  cargarListado(event?: PageEvent) {
    this.cargando = true;

    if (event != null) {
      this.filtro.numeroPagina = event.pageIndex + 1;
      this.filtro.cantPorPagina = event.pageSize;
    }

    this.terceroService.listadoPaginado(this.filtro, this.usuarioLogueado.token).subscribe(
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
