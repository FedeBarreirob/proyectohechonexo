export interface ComprobanteParaDescarga {
    comprobante: string,
    link: string,
    existeArchivo: boolean,
    concepto?: string,
    fecha?: string,
  seleccionado?: boolean,
  origen?: number
}
