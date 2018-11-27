import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfiles-edicion',
  templateUrl: './perfiles-edicion.component.html',
  styleUrls: ['./perfiles-edicion.component.css']
})
export class PerfilesEdicionComponent implements OnInit {

  private formSubmitAttempt: boolean;

  public formDatosAccesoGroup: FormGroup;
  public formDatosPersonalesGroup: FormGroup;
  public formCuentasVinculadasGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formDatosAccesoGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmacion: ['', Validators.required]
    });

    this.formDatosPersonalesGroup = this.formBuilder.group({
      nombre: ['', Validators.required],
      domicilio: ['', Validators.required],
      telefonos: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      cuit: ['', Validators.required],
      cbu: ['', Validators.required]
    });

    this.formCuentasVinculadasGroup = this.formBuilder.group({
      entidadCodigos: Array()
    });
  }

  guardar() {

  }

  isDatoAccesoFieldInvalid(field: string) {
    return (
      (!this.formDatosAccesoGroup.get(field).valid && this.formDatosAccesoGroup.get(field).touched) ||
      (this.formDatosAccesoGroup.get(field).untouched && this.formSubmitAttempt)
    );
  }

  isDatosPersonalesFieldInvalid(field: string) {
    return (
      (!this.formDatosPersonalesGroup.get(field).valid && this.formDatosPersonalesGroup.get(field).touched) ||
      (this.formDatosPersonalesGroup.get(field).untouched && this.formSubmitAttempt)
    );
  }
}
