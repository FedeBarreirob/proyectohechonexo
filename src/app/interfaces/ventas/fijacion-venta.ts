export interface FijacionVenta {
    especie: string,
    cosecha: string,
    fecha: Date,
    comprobante: string,
    puertoDestino: string,
    entregaDesde: Date,
    entregaHasta: Date,
    kilos: number,
    precioPorQuintal: number,
    moneda: string,
    tipoDeCambio?: number,
    contratoId: number,
    numeroComprobanteContrato: number,
    precioQQPesificado?: number,
    especieDescripcion?: string
}
