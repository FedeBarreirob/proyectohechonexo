export interface ResumenContratoCompraVenta {
    numeroSucursalContrato?: number,
    numeroComprobanteContrato?: number,
    tipo?: string,
    fechaVenta?: Date,
    fechaEntregaDesde?: Date,
    fechaEntregaHasta?: Date,
    especie?: string,
    cosecha?: string,
    kilosPactados?: number,
    kilosEntregados?: number,
    kilosPendientesEntregar?: number,
    kilosFijados?: number,
    kilosAFijar?: number
}
