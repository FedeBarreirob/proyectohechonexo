import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-card-mas-informacion',
  templateUrl: './card-mas-informacion.component.html',
  styleUrls: ['./card-mas-informacion.component.css']
})
export class CardMasInformacionComponent implements OnInit {

  esCelular: boolean;

  constructor(private deviceService: DeviceDetectorService,private dialogRef: MatDialogRef<CardMasInformacionComponent>) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

  salir(){
    this.dialogRef.close();
  }

}
