import { FiltroEspecieCosecha } from "../varios/filtro-especie-cosecha";

export interface FiltroEntregas {
    cuenta: string,
    fechaDesde: string,
    fechaHasta: string,
    filtroEspecieCosechaDTO: FiltroEspecieCosecha
}