import { StockGranosNoLiquidado } from "./stock-granos-no-liquidado";
import { SaldoCtaCte } from "./saldo-cta-cte";

export interface InsumoPendiente {
    stocksGranosNoLiquidadosDTO: Array<StockGranosNoLiquidado>,
    saldoCtaCte: SaldoCtaCte
}
