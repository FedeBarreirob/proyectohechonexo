export interface FiltroVentas {
    cuenta: string,
    fechaDesde?: string,
    fechaHasta?: string,
    especie: string,
    cosecha: string,
    paginado: boolean,
    pagina: number,
    cantPorPagina: number,
    contrato?: number
}