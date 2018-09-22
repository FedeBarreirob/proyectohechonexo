export interface ListadoComprobantesPendFact {
    exito: boolean,
    mensaje: string,
    datos: {
        listado: Array<MovimientoComprobantesPendFact>,
        totales: ComprobantesPendFactTotales
    }
}

export interface MovimientoComprobantesPendFact {
    tipoComprobante: string,
    comprobante: string,
    fecha: Date,
    codArticulo: string,
    descripcionArticulo: string,
    cantidad: number,
    cantidadPendiente: number,
    moneda: string,
    totalUsd: number
}

export interface ComprobantesPendFactTotales {
    totalCantidad: number,
    totalCantidadPendiente: number,
    totalTotal: number
}