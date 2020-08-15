import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-inicio-registro',
  templateUrl: './inicio-registro.component.html',
  styleUrls: ['./inicio-registro.component.css']
})
export class InicioRegistroComponent implements OnInit {

  profileForm = new FormGroup({
    name: new FormControl(''),
    dni: new FormControl(''),
    cuit: new FormControl(''),
    celular: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
  });
  esCelular: boolean;

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

  getErrorMessage() {
    if (this.profileForm.hasError('required')) {
      return 'You must enter a value';
    }

    return this.profileForm.hasError('email') ? 'Not a valid email' : '';
  }

}
