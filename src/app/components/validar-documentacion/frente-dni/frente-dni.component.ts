import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';
import {WebcamImage} from 'ngx-webcam';
import {Subject, Observable} from 'rxjs';
import { MensajeFotoSubidaComponent } from '../mensaje-foto-subida/mensaje-foto-subida.component';

@Component({
  selector: 'app-frente-dni',
  templateUrl: './frente-dni.component.html',
  styleUrls: ['./frente-dni.component.css']
})
export class FrenteDniComponent implements OnInit {

  esCelular: boolean;
  public webcamImage: WebcamImage = null;
  private trigger: Subject<void> = new Subject<void>();

  constructor(
    private deviceService: DeviceDetectorService, 
    private dialogRef: MatDialogRef<FrenteDniComponent>,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

  salir(){
    this.dialogRef.close();
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
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }
  
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

}
