import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthenticationService } from '../../../services/security/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-situacion-usuario-completa',
  templateUrl: './situacion-usuario-completa.component.html',
  styleUrls: ['./situacion-usuario-completa.component.css']
})
export class SituacionUsuarioCompletaComponent implements OnInit {

  esCelular: boolean;

  constructor(
    private deviceService: DeviceDetectorService,
    private authenticationService: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit() {
    this.esCelular = this.deviceService.isMobile();
  }

  volverAIngresar() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
