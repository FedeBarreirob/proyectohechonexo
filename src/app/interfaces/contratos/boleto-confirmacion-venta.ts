import { EncabezadoConfirmacionVenta } from "./encabezado-confirmacion-venta";
import { PlazoFijacion } from "./plazo-fijacion";
import { FijacionConfirmacionVenta } from "./fijacion-confirmacion-venta";
import { ContratoConsignacion } from "./contrato-consignacion";

export interface BoletoConfirmacionVenta {
    encabezado: EncabezadoConfirmacionVenta,
    plazosFijacion: Array<PlazoFijacion>,
    fijaciones: Array<FijacionConfirmacionVenta>,
    contrato: ContratoConsignacion
}
