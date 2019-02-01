import { ProvinciaAlg } from "./provincia-alg";

export interface DepartamentoAlg {
    departamento?: string,
    nombre?: string,
    provincia?: ProvinciaAlg
}
