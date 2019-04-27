export interface FiltroVentas {
    cuenta: string,
    fechaDesde?: string,
    fechaHasta?: string,
    especie: string,
    cosecha: string,
    totales: boolean,
    paginado: boolean,
    pagina: number,
    cantPorPagina: number
}