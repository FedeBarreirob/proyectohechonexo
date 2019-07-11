import { Component, OnInit } from '@angular/core';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  cuenta: EntidadAlg;

  constructor(private cuentasService: CuentaAlgService) { }

  ngOnInit() {
    this.cuentasService.cuentaSeleccionada$.subscribe(
      cuenta => this.cuenta = cuenta
    );
  }

}
