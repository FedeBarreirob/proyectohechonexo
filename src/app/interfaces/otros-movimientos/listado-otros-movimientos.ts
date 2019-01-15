export interface ListadoOtrosMovimientos {
    exito: boolean,
    mensaje: string,
    datos: {
        listado: Array<MovimientoOtroMovimiento>,
        totales: TotalOtrosMovimientos
    }
}

export interface MovimientoOtroMovimiento {
    especie: string,
    cosecha: string,
    fechaComprobante: Date,
    comprobante: string,
    productorReceptor: string,
    comprobanteOrigen: string,
    fechaComprobanteOrigen: Date,
    kgEntradas: number,
    kgSalidas: number,
    observaciones: string
}

export interface TotalOtrosMovimientos {
    totalKgEntradas: number,
    totalKgSalidas: number
}