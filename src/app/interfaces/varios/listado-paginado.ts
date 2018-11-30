export interface ListadoPaginado {
    listado: Array<any>,
    cantidadTotalRegistros: number,
    cantidadPorPagina: number,
    paginaActual: number
}