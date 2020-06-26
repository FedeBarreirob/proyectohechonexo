import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subject, BehaviorSubject } from 'rxjs';
import { EntidadAlg } from '../../../../interfaces/perfiles/entidad-alg';
import { CuentaAlgService } from '../../../../services/observers/cuentas-alg/cuenta-alg.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-billetera-pagar',
  templateUrl: './billetera-pagar.component.html',
  styleUrls: ['./billetera-pagar.component.css']
})
export class BilleteraPagarComponent implements OnInit, OnDestroy {

  destroy$: Subject<any> = new Subject<any>();
  esCelular: boolean;
  cuenta: EntidadAlg;
  totalEvent$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private deviceService: DeviceDetectorService,
    private cuentaService: CuentaAlgService
  ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();

    this.cuentaService.cuentaAlgSeleccionadaV2$.asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        cuenta => {
          this.cuenta = cuenta;
        }
      );

    if (this.cuentaService.cuentaAlgSeleccionadaV2$.getValue()) {
      this.cuenta = this.cuentaService.cuentaAlgSeleccionadaV2$.getValue();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}
