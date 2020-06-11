import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-billetera-cobrar',
  templateUrl: './billetera-cobrar.component.html',
  styleUrls: ['./billetera-cobrar.component.css']
})
export class BilleteraCobrarComponent implements OnInit {
  esCelular: boolean;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isOptional = false;

  constructor(
    private deviceService: DeviceDetectorService,
    private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ''
    });
  }

}
