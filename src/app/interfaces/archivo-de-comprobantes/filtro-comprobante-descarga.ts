export interface FiltroComprobanteDescarga {
    origen?: number,
    cuenta?: string,
    fechaDesde?: string,
    fechaHasta?: string,
    filtro?: string,
    paginado: boolean,
    pagina?: number,
    cantPorPagina?: number
}
