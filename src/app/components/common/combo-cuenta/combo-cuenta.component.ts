import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/services/security/authentication.service';
import { PerfilBasico } from 'src/app/interfaces/perfiles/perfil-basico';

@Component({
  selector: 'app-combo-cuenta',
  templateUrl: './combo-cuenta.component.html',
  styleUrls: ['./combo-cuenta.component.css']
})
export class ComboCuentaComponent implements OnInit {

  @Output()
  change: EventEmitter<string> = new EventEmitter<string>();

  @Input("disabled")
  disabled: boolean;

  public perfilBasico: PerfilBasico;

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.authenticationService.perfilActivo$.subscribe(
      perfil => this.perfilBasico = perfil);
    this.authenticationService.setPerfilActivo(this.authenticationService.perfilUsuarioSeleccionado());
  }

  // funcion encargada de capturar la cuenta seleccionada
  seleccionar(cuentaVinculada?: string) {
    this.change.emit(cuentaVinculada);
  }
}
