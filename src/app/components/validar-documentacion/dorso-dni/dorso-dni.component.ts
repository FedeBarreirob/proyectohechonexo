import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';
import {WebcamImage} from 'ngx-webcam';
import {Subject, Observable} from 'rxjs';
import { MensajeFotoSubidaComponent } from '../mensaje-foto-subida/mensaje-foto-subida.component';

@Component({
  selector: 'app-dorso-dni',
  templateUrl: './dorso-dni.component.html',
  styleUrls: ['./dorso-dni.component.css']
})
export class DorsoDniComponent implements OnInit {

  esCelular: boolean;
  public webcamImage: WebcamImage = null;
  private trigger: Subject<void> = new Subject<void>();

  constructor(
    private deviceService: DeviceDetectorService, 
    private dialogRef: MatDialogRef<DorsoDniComponent>,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

  salir(){
    this.dialogRef.close(null);
  }

  finalizarProceso(){
    this.dialog.open(MensajeFotoSubidaComponent, {
      maxWidth: '100vw',
      width: '100%',
      maxHeight: '100vh',
      height: '100%',
      panelClass: 'modal-sin-padding'
    });
  }

  //prueba

  triggerSnapshot(): void {
    this.trigger.next();
  }
  
  handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.dialogRef.close(webcamImage.imageAsDataUrl);
  }
  
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

}
