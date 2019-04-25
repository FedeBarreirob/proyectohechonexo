export interface FiltroEntregas {
    cuenta: string,
    fechaDesde?: string,
    fechaHasta?: string,
    especie: string,
    cosecha: string,
    agrupadoPorCampo: boolean,
    paginado: boolean,
    pagina: number,
    cantPorPagina: number
}