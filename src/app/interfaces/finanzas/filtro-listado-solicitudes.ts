export interface FiltroListadoSolicitudes {
    metodoSeleccionDisponible: number,
    numeroPagina: number,
    cantPorPagina: number,
    perfilId?: number,
    especieId?: number,
    estado?: number,
    fechaDeSolicitud?: string,
}
