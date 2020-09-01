import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Documento } from '../../../../interfaces/documentaciones/documento';
import { FileStorageService } from '../../../../services/file-storage/file-storage.service';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { MatSnackBar } from '@angular/material';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { GrupoDeDocumentaciones } from '../../../../enums/grupo-de-documentaciones.enum';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-upload-lista-documentos',
  templateUrl: './upload-lista-documentos.component.html',
  styleUrls: ['./upload-lista-documentos.component.css']
})
export class UploadListaDocumentosComponent implements OnInit, OnDestroy {

  @Input()
  grupoDeDocumentaciones: GrupoDeDocumentaciones;

  @Output()
  registroEjecutado: EventEmitter<boolean> = new EventEmitter<boolean>();

  destroy$: Subject<any> = new Subject<any>();
  cargando: boolean = false;
  documentacion: Array<Documento>;
  documentacion$: Subject<Array<Documento>> = new Subject<Array<Documento>>();

  constructor(
    private fileStorageService: FileStorageService,
    private authenticationService: AuthenticationService,
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

      this.fileStorageService.documentacionesDelPerfil(perfil.informacionPersonal.id, this.grupoDeDocumentaciones)
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
    if (this.documentacion && this.cargando == false) {

      this.cargando = true;

      this.fileStorageService.registrarDocumentacion(this.documentacion).subscribe(
        respuesta => {
          if (respuesta.exito == true) {
            this.notificarProgresoCargaTotal();
            this.registroEjecutado.emit(this.esCargaCompleta);
            this.openSnackBar("Documentos enviados correctamente");
          } else {
            this.openSnackBar(respuesta.mensaje);
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
   * Notifica al indicador de avance global
   */
  notificarProgresoCargaTotal() {
    this.documentacion$.next(this.documentacion);
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

  /**
   * indica si se han cargado todos los comprobantes
   */
  get esCargaCompleta(): boolean {
    if (this.documentacion && this.documentacion.length > 0) {
      return !this.documentacion.some(doc => !doc.archivoId);
    } else {
      return false;
    }
  }
}
