import { FiltroEspecieCosecha } from "../varios/filtro-especie-cosecha";

export interface FiltroVentas {
    cuenta: string,
    fechaDesde: string,
    fechaHasta: string,
    filtroEspecieCosechaDTO: FiltroEspecieCosecha
}