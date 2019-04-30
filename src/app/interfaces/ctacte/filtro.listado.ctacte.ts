export interface FiltroListadoCtaCte {
    cuenta: string,
    fechaDesde: string,
    fechaHasta: string,
    totales: boolean,
    paginado: boolean,
    pagina: number,
    cantPorPagina: number
}