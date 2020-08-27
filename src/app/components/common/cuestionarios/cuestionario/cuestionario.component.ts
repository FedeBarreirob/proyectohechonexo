import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CuestionariosService } from '../../../../services/cuestionarios/cuestionarios.service';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.css']
})
export class CuestionarioComponent implements OnInit, OnDestroy {

  @Input()
  formulario: any;

  guardando: boolean = false;
  destroy$: Subject<any> = new Subject<any>();

  constructor(
    private cuestionariosService: CuestionariosService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  /**
   * Registra el formulario
   */
  registrar() {
    if (this.guardando == false) {
      this.guardando = true;

      this.cuestionariosService.registrarRespuestas(this.formulario)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          respuesta => {
            this.openSnackBar(respuesta.mensaje);
          },
          error => {
            console.log(error);
            this.guardando = false
          },
          () => this.guardando = false
        );
    }
  }

  /**
   * Muestra una notificacion
   * @param message 
   */
  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }
}
