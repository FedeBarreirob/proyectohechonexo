import { FiltroEspecieCosecha } from "../varios/filtro-especie-cosecha";

export interface FiltroOtrosMovimientos {
    cuenta: string,
    fechaDesde: string,
    fechaHasta: string,
    filtroEspecieCosechaDTO: FiltroEspecieCosecha
}