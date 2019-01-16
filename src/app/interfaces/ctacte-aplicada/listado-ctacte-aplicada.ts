export interface ListadoCtacteAplicada {
    exito: boolean,
    mensaje: string,
    datos: {
        listado: Array<MovimientoCtaCteAplicada>,
        saldosTotales: SaldosTotales
    }
}

export interface MovimientoCtaCteAplicada {
    comprobante: string,
    fechaCtaCte: Date,
    fechaVencimiento: Date,
    concepto: string,
    moneda: string,
    tipoDeCambio: number,
    importeComprobantePesos: number,
    importeComprobanteDolares: number,
    saldoPesos: number,
    saldoDolares: number,
    tipoMovimiento: string,
    afectaSaldo: string
}

export interface SaldosTotales {
    saldoPesos: number,
    saldoDolares: number
}