export interface ListadoContratosAgrupadoPorCampo {
  exito?: boolean,
  mensaje?: string,
  datos?: {
    listado?: Array<MovimientoContrato>,
    listadoAgrupadoPorCampo?: Array<MovimientoContratoAgrupadoPorCampo>
    totales?: ContratosTotales
  }
}

export interface ListadoContratos {
  exito?: boolean,
  mensaje?: string,
  datos?: Array<MovimientoContrato>
}

export interface MovimientoContrato {
  especie?: string,
  cosecha?: string,
  campo?: string,
  fecha?: Date,
  comprobante?: string,
  kilosBrutos?: number,
  porcentajeHumedad?: number,
  kgMermaHumedad?: number,
  porcentajeZarandeo?: number,
  kgMermaZarandeo?: number,
  porcentajeVolatil?: number,
  kgMermaVolatil?: number,
  factor?: number,
  grado?: number,
  kilosNetos?: number,
  planta?: number,
  n1116A?: string,
  numeroComprobanteExterno?: string,
  acarreo?: string,
  empresaTransporte?: string,
  indicador?: number,
  especieDescripcion?: string
}

export interface ContratosTotales {
  totalKgBrutos?: number,
  totalKgHumedad?: number,
  totalKgZarandeo?: number,
  totalKgVolatil?: number,
  totalKgNetos?: number,
  cantidadContratos?: number
}

export interface MovimientoContratoAgrupadoPorCampo {
  campo?: string,
  listado?: Array<MovimientoContrato>,
  totales?: ContratosTotales
}
