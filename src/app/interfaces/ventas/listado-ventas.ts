export interface ListadoVentas {
    exito: boolean,
    mensaje: string,
    datos: {
        listado: Array<MovimientoVenta>,
        totales: VentasTotales
    }
}

export interface MovimientoVenta {
    especie: string,
    cosecha: string,
    fecha: Date,
    comprobante: string,
    puertoDestino: string,
    entregaDesde: Date,
    entregaHasta: Date,
    kilosNetos: number,
    tc: number,
    kilosLiquidados: number,
    precioPorQuintal: number,
    moneda: string
}

export interface VentasTotales {
    totalKgNetos: number,
    totalSinFijarTC: number
}