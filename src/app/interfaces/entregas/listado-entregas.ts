export interface ListadoEntregas {
    exito: boolean,
    mensaje: string,
    datos: {
        listado: Array<MovimientoEntrega>,
        listadoAgrupadoPorCampo: Array<MovimientoEntregaAgrupadoPorCampo>
        totales: EntregasTotales
    }
}

export interface MovimientoEntrega {
    especie: string,
    cosecha: string,
    campo: string,
    fecha: Date,
    comprobante: string,
    kilosBrutos: number,
    porcentajeHumedad: number,
    kgMermaHumedad: number,
    porcentajeZarandeo: number,
    kgMermaZarandeo: number,
    porcentajeVolatil: number,
    kgMermaVolatil: number,
    factor: number,
    grado: number,
    kilosNetos: number,
    planta: number,
    n1116A: string,
    numeroComprobanteExterno: string,
    acarreo: string,
    empresaTransporte: string,
    indicador: number
}

export interface EntregasTotales {
    totalKgBrutos: number,
    totalKgHumedad: number,
    totalKgZarandeo: number,
    totalKgVolatil: number,
    totalKgNetos: number,
    cantidadEntregas: number
}

export interface MovimientoEntregaAgrupadoPorCampo {
    campo: string,
    listado: Array<MovimientoEntrega>,
    totales: EntregasTotales
}