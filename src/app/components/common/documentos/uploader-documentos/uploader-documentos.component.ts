import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { FileStorageService } from '../../../../services/file-storage/file-storage.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-uploader-documentos',
  templateUrl: './uploader-documentos.component.html',
  styleUrls: ['./uploader-documentos.component.css']
})
export class UploaderDocumentosComponent implements OnInit, OnDestroy {

  @Input()
  descripcionDocumento: string;

  @Output()
  identificadorArchivo: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  porcentajeSubido: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  leyenda: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  nombreArchivo: EventEmitter<string> = new EventEmitter<string>();

  form: FormGroup;
  destroy$: Subject<any> = new Subject<any>();
  cargando: boolean = false;

  constructor(
    private fileStorageService: FileStorageService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      documento: ['']
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Selecciona el archivo y comienza la carga inmediatamente
   * @param event 
   */
  onSelectArchivo(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      this.nombreArchivo.emit(file.name);

      this.form.get('documento').setValue(file);
      this.subirArchivolServer(this.form.get('documento').value);
    }
  }

  /**
   * Sube el documento al servidor
   */
  subirArchivolServer(documentoASubir) {
    if (documentoASubir && this.cargando == false) {

      this.cargando = true;

      this.fileStorageService.subirDocumento(documentoASubir, this.descripcionDocumento)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {
            this.procesarInformeDeSubida(respuesta);
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
   * Procesa la respuesta del servicio para extrar el avance de subida y la respuesta
   * @param informe 
   */
  procesarInformeDeSubida(informe: any) {
    if (informe && informe.loaded && informe.total && informe.type == 1) {

      this.notificarProcentajeDeAvance(informe.loaded, informe.total);
      this.notificarLeyenda(informe.loaded, informe.total);

    } else if (informe && informe.type == 4 && informe.body) {

      if (informe.body.exito == true) {
        this.identificadorArchivo.emit(informe.body.datos);
        this.porcentajeSubido.emit(100);
        this.leyenda.emit("Completado");
      } else {
        this.leyenda.emit("Error");
      }

    }
  }

  /**
   * Devuelve el tamaño human legible de los bytes dados
   * @param bytes 
   * @param decimals 
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  /**
   * Notifica el porcentual cargado
   * @param loaded 
   * @param total 
   */
  notificarProcentajeDeAvance(loaded: any, total: any) {
    if (total != 0) {
      let porcentual: number = Number.parseFloat(loaded) * 100 / Number.parseFloat(total);
      this.porcentajeSubido.emit(porcentual);
    } else {
      this.porcentajeSubido.emit(0);
    }
  }

  /**
   * Notifica la leyenda
   * @param loaded 
   * @param total 
   */
  notificarLeyenda(loaded: any, total: any) {
    let loadedNumber = Number.parseFloat(loaded);
    let totalNumber = Number.parseFloat(total);

    if (loadedNumber != totalNumber) {
      let leyendaAMostrar = `${this.formatBytes(loadedNumber)} de ${this.formatBytes(totalNumber)}`;
      this.leyenda.emit(leyendaAMostrar);
    } else {
      this.leyenda.emit("Completado");
    }
  }

  /**
   * cancela el proceso de subida
   */
  cancelar() {
    this.destroy$.next();
    this.porcentajeSubido.emit(0);
    this.leyenda.emit(null);
    this.identificadorArchivo.emit(null);
    this.nombreArchivo.emit(null);
  }
}
