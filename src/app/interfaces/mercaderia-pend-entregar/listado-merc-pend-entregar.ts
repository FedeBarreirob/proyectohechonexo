export interface ListadoMercPendEntregar {
    exito?: boolean,
    mensaje?: string,
    datos?: {
        listado?: Array<MovimientoMercPendEntregar>,
        totales?: MercPendEntregarTotales
    }
}

export interface MovimientoMercPendEntregar {
    tipoComprobante?: string,
    comprobante?: string,
    fecha?: Date,
    codArticulo?: string,
    descripcionArticulo?: string,
    cantidad?: number,
    cantidadPendiente?: number,
    moneda?: string,
    totalUsd?: number
}

export interface MercPendEntregarTotales {
    totalCantidad?: number,
    totalCantidadPendiente?: number,
    totalTotal?: number
}
