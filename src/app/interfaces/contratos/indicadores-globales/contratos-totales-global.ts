import { ContratosIndicadorFijacionesGlobal } from "./contratos-indicador-fijaciones-global";
import { ContratosIndicadorPesificacionesGlobal } from "./contratos-indicador-pesificaciones-global";
import { ContratosIndicadorLiquidacionesGlobal } from "./contratos-indicador-liquidaciones-global";
import { ContratosIndicadorPagosGlobal } from "./contratos-indicador-pagos-global";

export interface ContratosTotalesGlobal {
    indicadoresFijaciones: ContratosIndicadorFijacionesGlobal,
    indicadoresPesificacion: ContratosIndicadorPesificacionesGlobal,
    indicadoresLiquidacion: ContratosIndicadorLiquidacionesGlobal,
    indicadoresPagos: ContratosIndicadorPagosGlobal
}
