import { Component, OnInit, OnDestroy } from '@angular/core';
import { FechaYHora } from '../../../interfaces/reloj/fecha-yhora';
import { RelojService } from '../../../services/reloj/reloj.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-fecha-hora',
  templateUrl: './fecha-hora.component.html',
  styleUrls: ['./fecha-hora.component.css']
})
export class FechaHoraComponent implements OnInit, OnDestroy {

  fechaHora: FechaYHora;
  destroy$: Subject<any> = new Subject<any>();

  constructor(private relojService: RelojService) { }

  ngOnInit() {
    this.relojService.getInfoReloj()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        infoReloj => this.fechaHora = infoReloj
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
