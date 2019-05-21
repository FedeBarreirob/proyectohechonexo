export interface FiltroCtacteAplicada {
    cuenta: string,
    fechaDesde: string,
    fechaHasta: string,
    totales: boolean,
    paginado: boolean,
    pagina?: number,
    cantPorPagina?: number
}
