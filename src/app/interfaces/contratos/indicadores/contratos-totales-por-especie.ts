import { ContratosIndicadorEntregas } from "./contratos-indicador-entregas";
import { ContratosIndicadorFijaciones } from "./contratos-indicador-fijaciones";

export interface ContratosTotalesPorEspecie {
    indicadoresEntregas: Array<ContratosIndicadorEntregas>,
    indicadoresFijaciones: Array<ContratosIndicadorFijaciones>
}
