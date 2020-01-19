import { StockGranosNoLiquidado } from "./stock-granos-no-liquidado";
import { SaldoCtaCte } from "./saldo-cta-cte";

export interface ComprobantePendienteFacturar {
    stocksGranosNoLiquidadosDTO: Array<StockGranosNoLiquidado>,
    saldoCtaCte: SaldoCtaCte
}
