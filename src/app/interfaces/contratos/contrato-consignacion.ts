import { PlazoFijacion } from "./plazo-fijacion";

export interface ContratoConsignacion {
    nroSucursal?: string,
    numeroComprobante?: string,
    productorNombre?: string,
    productorCuit?: string,
    productorDomicilio?: string,
    productorRepresentante?: string,
    productorRepresentanteDni?: string,
    productorRepresentanteDomicilio?: string,
    kilosAConsignar?: number,
    especieEnConsignacion?: string,
    cosecha?: string,
    destino?: string,
    procedencia?: string,
    plazosFijacion?: Array<PlazoFijacion>
}
