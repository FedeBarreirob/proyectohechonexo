import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { PerfilesService } from '../../../services/perfiles/perfiles.service';
import { PerfilBasico } from '../../../interfaces/perfiles/perfil-basico';
import { PerfilBasicoInfoPersonal } from '../../../interfaces/perfiles/perfil-basico-informacion-personal';

@Component({
  selector: 'app-selector-unidad-medida',
  templateUrl: './selector-unidad-medida.component.html',
  styleUrls: ['./selector-unidad-medida.component.css']
})
export class SelectorUnidadMedidaComponent implements OnInit {

  @Input()
  perfilBasico: PerfilBasico;

  unidadMedidaPesoSeleccionado: string;
  cargando: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private perfilesService: PerfilesService
  ) { }

  ngOnInit() {
    this.unidadMedidaPesoSeleccionado = this.perfilBasico.informacionPersonal.unidadMedidaPeso;
  }

  // funcion encargada de actualizar la unidad de medida
  actualizarUnidadDeMedidaPeso(nuevaUnidad: string) {
    if (this.cargando == false) {

      this.cargando = true;

      let perfilBasicoInfoPersonal: PerfilBasicoInfoPersonal = {
        id: this.perfilBasico.informacionPersonal.id,
        unidadMedidaPeso: nuevaUnidad
      };

      this.perfilesService.actualizarUnidadMedidaPeso(perfilBasicoInfoPersonal)
        .subscribe(
          respuesta => {
            if (respuesta.exito) {
              this.unidadMedidaPesoSeleccionado = nuevaUnidad;

              let mensaje = `${respuesta.mensaje}`;

              this.perfilesService.reCargarPerfilLogueado().subscribe(
                () => {
                  this.cargando = false;
                },
                () => {
                  this.cargando = false;
                }
              );

              this.openSnackBar(mensaje);
            } else {
              this.openSnackBar(respuesta.mensaje);
              this.cargando = false;
            }
          },
          error => {
            console.log(error);
            this.openSnackBar("Error al intentar actualizar la unidad de medida.");
            this.cargando = false;
          }
        );
    }
  }

  // abre una notificacion
  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
    });
  }
}
