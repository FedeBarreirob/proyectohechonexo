import { ContratosIndicadorEntregas } from "./contratos-indicador-entregas";
import { ContratosIndicadorFijaciones } from "./contratos-indicador-fijaciones";
import { ContratosIndicadorPesificaciones } from "./contratos-indicador-pesificaciones";
import { ContratosIndicadorLiquidaciones } from "./contratos-indicador-liquidaciones";
import { ContratosIndicadorPagos } from "./contratos-indicador-pagos";

export interface ContratosTotalesPorEspecie {
    indicadoresEntregas: Array<ContratosIndicadorEntregas>,
    indicadoresFijaciones: Array<ContratosIndicadorFijaciones>,
    indicadoresPesificacion: Array<ContratosIndicadorPesificaciones>,
    indicadoresLiquidacion: Array<ContratosIndicadorLiquidaciones>,
    indicadoresPagos: Array<ContratosIndicadorPagos>
}
