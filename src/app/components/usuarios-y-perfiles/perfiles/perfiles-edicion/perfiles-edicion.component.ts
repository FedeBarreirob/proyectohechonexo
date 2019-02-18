import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PerfilesService } from '../../../../services/perfiles/perfiles.service';
import { PerfilBasico } from '../../../../interfaces/perfiles/perfil-basico';
import { PerfilBasicoCredencial } from '../../../../interfaces/perfiles/perfil-basico-credencial';
import { PerfilBasicoInfoPersonal } from '../../../../interfaces/perfiles/perfil-basico-informacion-personal';
import { Rol } from '../../../../interfaces/security/rol';
import { AuthenticationService } from '../../../../services/security/authentication.service';
import { UserAuth } from '../../../../models/security/user';
import { RoleEnum } from '../../../../enums/role-enum.enum';

@Component({
	selector: 'app-perfiles-edicion',
	templateUrl: './perfiles-edicion.component.html',
	styleUrls: ['./perfiles-edicion.component.css']
})
export class PerfilesEdicionComponent implements OnInit {

	private formSubmitAttempt: boolean;
	public guardando: boolean = false;
	private usuarioLogueado: UserAuth;

	public formDatosAccesoGroup: FormGroup;
	public formDatosPersonalesGroup: FormGroup;
	public formCuentasVinculadasGroup: FormGroup;
	public formComercialesVinculadosGroup: FormGroup;

	// busqueda de comerciales
	public buscadorComercial: FormControl = new FormControl();
	public listadoComerciales = <any>[];
	public comercialSeleccionado: PerfilBasico = null;
	public listadoComercialesSeleccionados = <any>[];

	public esRegistroNuevo: boolean;
	public titulo: string;

	public listadoCodigos: string[] = [];
	// TODO: Ver de traer los roles por servicio
	public roles: Array<Rol> = [
		{
			id: 1,
			denominacion: "Administrador",
			admin: true
		},
		{
			id: 7,
			denominacion: "SubAdministrador",
			admin: false
		},
		{
			id: 2,
			denominacion: "Productor",
			admin: false
		},
		{
			id: 9,
			denominacion: "Comercial",
			admin: false
		}];

	// subtipos para los perfiles
	public subtiposCliente: Array<string> = ['PRODUCTOR', 'EMPRESA'];

	public perfilBasico: PerfilBasico;
	selection: any;
	searchControl: any;

	constructor(
		public authenticationService: AuthenticationService,
		private formBuilder: FormBuilder,
		private snackBar: MatSnackBar,
		private perfilService: PerfilesService,
		private dialogRef: MatDialogRef<PerfilesEdicionComponent>,
		@Inject(MAT_DIALOG_DATA) public data: PerfilBasico
	) {
		this.usuarioLogueado = <UserAuth>this.authenticationService.usuarioLogueado();
	}

	ngOnInit() {
		// determinar si es un registro nuevo o una actualizacion de perfil
		this.esRegistroNuevo = this.data == null ? true : false;
		this.titulo = this.esRegistroNuevo ? "Nuevo perfil" : "Ver/Editar perfil";

		// credenciales
		if (this.data != null) {
			this.formDatosAccesoGroup = this.formBuilder.group(this.data.credencial);
			this.formDatosAccesoGroup.addControl('subtipo', new FormControl(this.subtiposCliente.filter(x => x === (this.data.subtipo != null ? this.data.subtipo : null))[0]));

			// se establece rol PRODUCTOR por defecto en caso que el usuario que genera el registro se a suadmin o comercial
			if (this.authenticationService.esSuadminOComercial()) {
				this.formDatosAccesoGroup.addControl('rol', new FormControl({ value: this.roles.filter(x => x.id == RoleEnum.PRODUCTOR.valueOf())[0], disabled: true }));
			} else {
				this.formDatosAccesoGroup.addControl('rol', new FormControl(this.roles.filter(x => x.id == (this.data.rol != null ? this.data.rol.id : null))[0]));
			}
		} else {
			if (this.authenticationService.esSuadminOComercial()) {
				this.formDatosAccesoGroup = this.formBuilder.group({
					username: [''],
					password: [''],
					passwordConfirmacion: [''],
					rol: new FormControl({ value: this.roles.filter(x => x.id == RoleEnum.PRODUCTOR.valueOf())[0], disabled: true }),
					subtipo: [null]
				});
			} else {
				this.formDatosAccesoGroup = this.formBuilder.group({
					username: [''],
					password: [''],
					passwordConfirmacion: [''],
					rol: [null],
					subtipo: [null]
				});
			}
		}

		// informacion personal
		if (this.data != null) {
			this.formDatosPersonalesGroup = this.formBuilder.group(this.data.informacionPersonal);
		} else {
			this.formDatosPersonalesGroup = this.formBuilder.group({
				nombre: [''],
				domicilio: [''],
				telefonos: [''],
				email: [''],
				cuit: [''],
				cbu: [''],
			});
		}

		// cuentas vinculadas
		this.formCuentasVinculadasGroup = this.formBuilder.group({
			entidadCodigo: [''],
		});
		if (this.data != null && this.data.entidadCodigos != null) {
			this.listadoCodigos = Object.assign([], this.data.entidadCodigos);
		}

		// comerciales vinculados
		this.formComercialesVinculadosGroup = this.formBuilder.group({
			perfilComercial: [''],
		});
		if (this.data != null && this.data.comercialesVinculados != null) {
			this.listadoComercialesSeleccionados = Object.assign([], this.data.comercialesVinculados);
		}

		this.buscadorComercial.valueChanges.subscribe(
			termino => {
				if (termino != '') {
					this.perfilService.perfilesDeUnRolDado(RoleEnum['COMERCIAL'], termino, this.usuarioLogueado.token).subscribe(
						respuesta => {
							this.listadoComerciales = respuesta;
						}
					)
				}
			}
		);
	}

	// funcion encargada de enviar los datos para su persistencia
	guardar() {
		if (!this.guardando) {
			this.guardando = true;

			let datosAcceso: PerfilBasicoCredencial = this.formDatosAccesoGroup.getRawValue();
			let informacionPersonal: PerfilBasicoInfoPersonal = this.formDatosPersonalesGroup.getRawValue();
			let rol: Rol = this.formDatosAccesoGroup.value.rol;
			let subtipo: string = this.formDatosAccesoGroup.value.subtipo;

			this.perfilBasico = {
				credencial: datosAcceso,
				informacionPersonal: informacionPersonal,
				entidadCodigos: this.listadoCodigos,
				rol: rol,
				comercialesVinculados: this.listadoComercialesSeleccionados,
				subtipo: subtipo
			};

			if (this.esRegistroNuevo) {
				this.guardarNuevo();
			} else {
				this.guardarModificar();
			}
		} else {
			this.openSnackBar("Existe un proceso de registro ejecutándose.", "Registro/Actualización del perfil");
		}
	}

	// funcion encargada de guardar un nuevo perfil
	guardarNuevo() {
		this.perfilService.registrarNuevo(this.perfilBasico, this.usuarioLogueado.token)
			.subscribe(respuesta => {

				this.guardando = false;

				if (respuesta && respuesta.exito == false) {
					this.openSnackBar(respuesta.mensaje, "Registro del perfil");
				} else {
					this.openSnackBar(respuesta.mensaje, "Registro del perfil");
					this.dialogRef.close();
				}

			}, error => {
				this.guardando = false;

				this.openSnackBar("Error al intentar registrar el perfil", "Registro del perfil");
				console.log(error);
			});
	}

	// funcion encargada de actualizar un perfil
	guardarModificar() {
		this.perfilService.actualizar(this.perfilBasico, this.usuarioLogueado.token)
			.subscribe(respuesta => {

				this.guardando = false;

				if (respuesta && respuesta.exito == false) {
					this.openSnackBar(respuesta.mensaje, "Actualización del perfil");
				} else {
					this.openSnackBar(respuesta.mensaje, "Actualización del perfil");
					this.dialogRef.close();
				}

			}, error => {
				this.guardando = false;

				this.openSnackBar("Error al intentar actualizar el perfil", "Actualización del perfil");
				console.log(error);
			});
	}

	isCuentasVinculadasFieldInvalid(field: string) {
		return (
			(!this.formCuentasVinculadasGroup.get(field).valid && this.formCuentasVinculadasGroup.get(field).touched) ||
			(this.formCuentasVinculadasGroup.get(field).untouched && this.formSubmitAttempt)
		);
	}

	// funcion que agrega una cuenta al listado de cuentas a vincular
	agregarCuenta() {
		if (this.formCuentasVinculadasGroup.valid) {
			const index: number = this.listadoCodigos.indexOf(this.formCuentasVinculadasGroup.value.entidadCodigo);
			if (index == -1) {
				this.listadoCodigos.unshift(this.formCuentasVinculadasGroup.value.entidadCodigo);
				this.formCuentasVinculadasGroup.reset();
			} else {
				this.openSnackBar("La cuenta se encuentra en el listado", "Vinculación de cuentas");
			}
		} else {
			this.openSnackBar("Indique la cuenta", "Vinculación de cuentas");
		}
	}

	// funcion encargada de quitar una cuenta del listado
	quitarCuenta(codigo: string) {
		try {
			const index: number = this.listadoCodigos.indexOf(codigo);
			if (index !== -1) {
				this.listadoCodigos.splice(index, 1);
			}
		} catch (e) {
			console.log(e);
			this.openSnackBar("Error al desvincular la cuenta", "Vinculación de cuentas");
		}
	}

	isComercialesVinculadosFieldInvalid(field: string) {
		return (
			(!this.formComercialesVinculadosGroup.get(field).valid && this.formComercialesVinculadosGroup.get(field).touched) ||
			(this.formComercialesVinculadosGroup.get(field).untouched && this.formSubmitAttempt)
		);
	}

	// abre una notificacion
	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			duration: 2000,
		});
	}

	// funcion encargada de capturar el comercial seleccionado
	seleccionarComercial(comercial: PerfilBasico) {
		this.comercialSeleccionado = comercial;
	}

	// funcion encargada de obtener el texto a mostrar cuando se seleccione un comercial
	displayComercial(comercial: PerfilBasico) {
		if (comercial) {
			return comercial.informacionPersonal.nombre !== null ? comercial.informacionPersonal.nombre : comercial.credencial.username;
		} else {
			return '';
		}
	}

	// funcion encargada de limpiar la seleccion
	limpiarSeleccionComercialSiVacio() {
		if (this.buscadorComercial.value == "") {
			this.limpiarComercialSeleccionado();
		}
	}

	// limpia la entrada de texto y el comercial seleccionado
	private limpiarComercialSeleccionado() {
		this.buscadorComercial.reset();
		this.comercialSeleccionado = null;
	}

	// funcion encargada de agregar un comercial a la lista de vinculaciones
	agregarComercial() {

		if (this.comercialSeleccionado != null) {

			const index: number = this.indiceEnListaComercial(this.comercialSeleccionado);
			if (index == -1) {

				this.listadoComercialesSeleccionados.unshift(this.comercialSeleccionado);
				this.limpiarComercialSeleccionado();

			} else {
				this.openSnackBar("El comercial ya se encuentra en el listado", "Vinculación de comerciales");
			}

		} else {
			this.openSnackBar("Indique el comercial", "Vinculación de comerciales");
		}
	}

	// funcion encargada de quitar un comercial del listado de comerciales
	quitarComercial(comercial: PerfilBasico) {

		const index: number = this.indiceEnListaComercial(comercial);

		if (index !== -1) {
			this.listadoComercialesSeleccionados.splice(index, 1);
		}
	}

	// funcion que devuelve el indice en el listado de un comercial
	private indiceEnListaComercial(comercial: PerfilBasico): number {
		return this.listadoComercialesSeleccionados
			.map(unComercial => unComercial.informacionPersonal.id)
			.indexOf(comercial.informacionPersonal.id);
	}

	// funcion encargada de limpiar los datos vinculados al perfil
	limpiarDatosVinculadosAlPerfil() {
		this.formCuentasVinculadasGroup.reset();
		this.limpiarComercialSeleccionado();
		this.listadoCodigos = [];
		this.listadoComerciales = [];
		this.listadoComercialesSeleccionados = [];
	}

}
