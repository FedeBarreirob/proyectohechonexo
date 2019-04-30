export interface ListadoCuentaCorrienteConSaldos {
    exito?: boolean,
    mensaje?: string,
    datos?: {
        listado?: Array<MovimientoCtaCte>,
        saldosTotales?: SaldosTotales
    }
}

export interface ListadoCuentaCorriente {
    exito?: boolean,
    mensaje?: string,
    datos?: Array<MovimientoCtaCte>
}

export interface MovimientoCtaCte {
    fechaVencimiento?: Date,
    comprobante?: string,
    concepto?: string,
    fechaCtaCte?: Date,
    tipoDeCambio?: number,
    importeComprobantePesos?: number,
    importeComprobanteDolares?: number,
    saldoPesos?: number,
    saldoDolares?: number,
    saldoContable?: number,
    moneda?: string,
    tipoMovimiento?: string,
    saldoInicialPesos?: number,
    saldoInicialDolares?: number,
    saldoInicialContable?: number,
    afectaSaldo?: string,
    linkComprobante?: string
}

export interface SaldosTotales {
    saldoPesos?: number,
    saldoDolares?: number,
    saldoContable?: number
}