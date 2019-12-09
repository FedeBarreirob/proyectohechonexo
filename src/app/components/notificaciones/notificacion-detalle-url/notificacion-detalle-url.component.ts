import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from '../../../services/notificaciones/notificaciones.service';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { Notificacion } from '../../../interfaces/notificaciones/notificacion';
import { Subject } from 'rxjs/internal/Subject';
import { ComprobanteNovedad } from '../../../interfaces/notificaciones/comprobante-novedad';
import { ComprobantesDownloaderService } from '../../../services/sharedServices/downloader/comprobantes-downloader.service';
import { environment } from '../../../../environments/environment';
import { DownloaderUtilService } from '../../../services/sharedServices/downloader/downloader-util.service';
import { saveAs } from 'file-saver/FileSaver';
import { ConfirmacionDeVentaNovedad } from '../../../interfaces/notificaciones/confirmacion-de-venta-novedad';
import { MatSnackBar } from '@angular/material';
import { EstadoNotificaciones } from '../../../enums/estado-notificaciones.enum';
import { UserAuth } from '../../../models/security/user';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-notificacion-detalle-url',
  templateUrl: './notificacion-detalle-url.component.html',
  styleUrls: ['./notificacion-detalle-url.component.css']
})
export class NotificacionDetalleUrlComponent implements OnInit {

  private usuarioLogueado: UserAuth;
  public notificacion: Notificacion;
  esCelular: boolean;

  constructor(
    private notificacionService: NotificacionesService,
    private authenticationService: AuthenticationService,
    private comprobanteDownloaderService: ComprobantesDownloaderService,
    private downloaderUtilService: DownloaderUtilService,
    private snackBar: MatSnackBar,
    private activatedRouter: ActivatedRoute,
    private deviceService: DeviceDetectorService
    ) {
      this.usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();
    }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
    
    this.activatedRouter.params.subscribe(params => {
      if (params.id) {
        var perfil = this.authenticationService.perfilUsuarioLogueado();
        this.notificacionService.notificacionPorId(perfil.informacionPersonal.id, parseInt(params.id))
          .subscribe(respuesta => {
            if (respuesta.exito) {
              this.notificacion = respuesta.datos;
              this.marcarComoLeido();
            }
          });
      }
    });
  }

  // funcion que inicia la descarga del comprobante
  descargarComprobante(comprobante: ComprobanteNovedad) {
    this.comprobanteDownloaderService.comprobanteDescargado(comprobante.link, comprobante.comprobante)
      .subscribe(respuesta => {
        var mediaType = 'application/pdf';
        var blob = new Blob([respuesta], { type: mediaType });
        var filename = `${comprobante.comprobante}.pdf`;

        if (blob.size !== 0) {

          if (environment.inPhonegap) {
            this.downloaderUtilService.download(filename, blob, mediaType);
          } else {
            saveAs(blob, filename);
          }

        } else {
          this.openSnackBar("El comprobante no se encuentra disponible para su descarga.", "Descarga de comprobantes");
        }

      }, error => console.log(error));
  }

  // abre una notificacion
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  // funcion encargada de marcar como leido a la notificacion una vez abierto
  marcarComoLeido() {
    let notificacionModificada: Notificacion = {
      id: this.notificacion.id,
      estado: EstadoNotificaciones.LEIDO
    };

    if (this.usuarioLogueado != null) {
      this.notificacionService.marcarNotificacion(
        notificacionModificada)
        .subscribe(respuesta => {

          if (respuesta.exito) {
            this.notificacionService.huboCambiosEnEstado();
          }

        }, error => console.log(error));
    }
  }

  // funcion que inicia la descarga del comprobante de confirmacion de venta
  descargarConfirmacionVenta(confirmacionVenta: ConfirmacionDeVentaNovedad) {
    this.comprobanteDownloaderService.confirmacionVentaDescargado(confirmacionVenta.sucursal, confirmacionVenta.numeroComprobante)
      .subscribe(respuesta => {
        var mediaType = 'application/pdf';
        var blob = new Blob([respuesta], { type: mediaType });
        var filename = `${confirmacionVenta.comprobante}.pdf`;

        if (blob.size !== 0) {

          if (environment.inPhonegap) {
            this.downloaderUtilService.download(filename, blob, mediaType);
          } else {
            saveAs(blob, filename);
          }

        } else {
          this.openSnackBar("El comprobante no se encuentra disponible para su descarga.", "Descarga de comprobantes");
        }

      }, error => console.log(error));
  }
}
