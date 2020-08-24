export interface TipoDeArchivo {
    id: number,
    grupo: number,
    tipo: number,
    denominacion?: string,
    descripcion?: string,
    habilitado?: boolean,
    formato?: number,
    subIdentificadorFijo?: number
}
