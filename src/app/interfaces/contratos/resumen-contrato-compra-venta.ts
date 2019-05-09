import { PlazoFijacion } from "./plazo-fijacion";

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
    kilosAFijar?: number,
    tipoDescripcion?: string,
    contratoId?: number,
    plazosFijacion?: Array<PlazoFijacion>,
    porcentajeKilosEntregados?: number,
    porcentajeKilosFijados?: number,
    fechaHastaFijacion?: Date,
    fechaDesdeFijacion?: Date,
    vencidoFijacion?: boolean,
    aFijar?: number,
    tipoNegocioDescripCorta?: string,
    kilosFacturados?: number
}
