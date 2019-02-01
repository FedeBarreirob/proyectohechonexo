import { LocalidadAlgPk } from "./localidad-alg-pk";
import { DepartamentoAlg } from "./departamento-alg";

export interface LocalidadAlg {
    id?: LocalidadAlgPk,
    localidad?: string,
    caracteristicaTelefonica?: string,
    departamento?: DepartamentoAlg
}
