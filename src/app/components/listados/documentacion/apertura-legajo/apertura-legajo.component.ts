import { Component, OnInit, OnDestroy } from '@angular/core';
import { FileStorageService } from '../../../../services/file-storage/file-storage.service';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { Subject } from 'rxjs';
import { GrupoDeDocumentaciones } from '../../../../enums/grupo-de-documentaciones.enum';
import { takeUntil } from 'rxjs/operators';
import { Documento } from '../../../../interfaces/documentaciones/documento';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-apertura-legajo',
  templateUrl: './apertura-legajo.component.html',
  styleUrls: ['./apertura-legajo.component.css']
})
export class AperturaLegajoComponent implements OnInit, OnDestroy {

  destroy$: Subject<any> = new Subject<any>();
  cargando: boolean = false;
  documentacion: Array<Documento>;
  documentacion$: Subject<Array<Documento>> = new Subject<Array<Documento>>();

  constructor(
    private fileStorageService: FileStorageService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    let perfil: PerfilBasico = this.authenticationService.perfilUsuarioSeleccionado();
    this.cargarDocumentacion(perfil);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Carga la documentación del legajo a completar
   */
  cargarDocumentacion(perfil: PerfilBasico) {
    if (perfil && this.cargando == false) {

      this.cargando = true;

      this.fileStorageService.documentacionesDelPerfil(perfil.informacionPersonal.id, GrupoDeDocumentaciones.ALTA_LEGAJO)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {
            this.documentacion = respuesta.datos;
            this.notificarProgresoCargaTotal();
          },
          error => {
            console.log(error);
            this.cargando = false;
          },
          () => this.cargando = false
        );

    } else {
      this.documentacion = null;
    }
  }

  /**
   * Registra toda la documentación relevada
   */
  registrarDocumentacion() {
    if (this.documentacion) {

      this.fileStorageService.registrarDocumentacion(this.documentacion).subscribe(
        respuesta => {
          if (respuesta.exito == true) {
            this.notificarProgresoCargaTotal();
            this.salir();
          } else {
            this.openSnackBar(respuesta.mensaje);
          }
        }
      );

    }
  }

  /**
   * Notifica al indicador de avance global
   */
  notificarProgresoCargaTotal() {
    this.documentacion$.next(this.documentacion);
  }

  salir() {
    this.router.navigate(["/"]);
  }

  /**
   * Muestra una notificacion
   * @param message 
   */
  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

  /**
   * Notifica a todos el estado de carga del legajo
   */
  notificarSiElLegajoSeCargoCompletamente() {
    if (this.documentacion && this.documentacion.length > 0) {
      let completo: boolean = !this.documentacion.some(doc => !doc.archivoId);
      this.fileStorageService.esDocLegajoCargado.next(completo);
    }
  }
}
