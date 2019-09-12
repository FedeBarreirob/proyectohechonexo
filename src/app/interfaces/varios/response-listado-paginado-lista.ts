export interface ResponseListadoPaginadoLista {
    listado: Array<any>,
    cantidadTotalRegistros: number,
    cantidadPorPagina: number,
    paginaActual: number,
    numeroUltimaPagina: number
}
