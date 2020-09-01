import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-inicio-registro-definir-cuenta',
  templateUrl: './inicio-registro-definir-cuenta.component.html',
  styleUrls: ['./inicio-registro-definir-cuenta.component.css']
})
export class InicioRegistroDefinirCuentaComponent implements OnInit {

  profileForm = new FormGroup({
    username: new FormControl(''),
    passwordControl: new FormControl(''),
    password: new FormControl(''),
  });
  esCelular: boolean;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

}
