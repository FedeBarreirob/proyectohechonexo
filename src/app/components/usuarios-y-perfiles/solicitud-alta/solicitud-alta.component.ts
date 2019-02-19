import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PerfilesService } from 'src/app/services/perfiles/perfiles.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { SolicitudAlta } from 'src/app/interfaces/perfiles/solicitud-alta';

@Component({
	selector: 'app-solicitud-alta',
	templateUrl: './solicitud-alta.component.html',
	styleUrls: ['./solicitud-alta.component.css']
})
export class SolicitudAltaComponent implements OnInit {

	frmAlta: FormGroup;
	cargando: boolean = false;
	solicitudEnviada: boolean = false;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private snackBar: MatSnackBar,
		private perfilService: PerfilesService
	) { }

	ngOnInit() {
		this.frmAlta = this.formBuilder.group({
			razonSocial: ['', Validators.required],
			email: ['', Validators.email],
			cuit: ['', Validators.required],
			codCuentaAlgoritmo: [''],
			telefono: ['', Validators.required]
		});
	}

	// funcion encargada de ejecutar la solicitud de alta
	solicitarAlta() {
		this.cargando = true;

		let solicitud: SolicitudAlta = this.frmAlta.getRawValue();

		this.perfilService.solicitudAlta(solicitud).subscribe(
			respuesta => {

				if (respuesta.exito) {
					this.solicitudEnviada = true;
				}

				this.openSnackBar(respuesta.mensaje);
				this.cargando = false;
			},
			error => {
				console.log(error);
				this.cargando = false;
			}
		);
	}

	// funcion encargada de volver al login
	volver() {
		this.router.navigate(['login']);
	}

	// abre una notificacion
	openSnackBar(message: string) {
		this.snackBar.open(message, "Solicitud de alta", {
			duration: 3000,
		});
	}
}
