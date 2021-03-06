export interface FiltroCtacteAplicada {
    cuenta: string,
    fechaDesde?: string,
    fechaHasta?: string,
    totales?: boolean,
    paginado?: boolean,
    pagina?: number,
    cantPorPagina?: number,
    ordenado?: boolean,
    aCobrar?: boolean,
    aPagar?: boolean,
    vencido?: boolean,
    AVencer?: boolean,
    granos?: boolean,
    agroinsumos?: boolean,
    nutricionAnimal?: boolean,
    moneda?: string,
    servicios?: boolean
}
