import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatDialog, PageEvent, MatSlideToggleChange, MatSnackBar } from '@angular/material';
import { TutorialModalComponent } from '../../../common/tutorial-modal/tutorial-modal.component';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit, AfterViewInit {

  cuenta: EntidadAlg;
  esCelular: boolean;

  constructor(
    private cuentasService: CuentaAlgService,
    private deviceService: DeviceDetectorService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    // Modal tutorial
    this.dialog.open(TutorialModalComponent, {
      data: {}
    });

    this.esCelular = this.deviceService.isMobile();

    this.cuentasService.cuentaSeleccionada$.subscribe(
      cuenta => this.cuenta = cuenta
    );
  }

  ngAfterViewInit(): void {
    if (this.cuentasService.cuentaPreviamenteSeleccionada && !this.esCelular) {
      this.cuenta = this.cuentasService.cuentaPreviamenteSeleccionada;
    }
  }
}
