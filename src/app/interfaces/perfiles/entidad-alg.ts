import { EntidadAlgPk } from "./entidad-alg-pk";
import { LocalidadAlg } from "./localidad-alg";

export interface EntidadAlg {
    id?: EntidadAlgPk,
    nombre?: string,
    domicilioCalle?: string,
    domicilioNro?: string,
    domicilioPiso?: string,
    domicilioDepto?: string,
    localidad?: LocalidadAlg,
    telefonos?: string,
    email?: string,
    tipoDni?: string,
    numeroDocumento?: number,
    cuit?: string,
    cbu?: string,
    nombreDeFantasia?: string
}
