import { TipoDeArchivo } from "./tipo-de-archivo";

export interface Documento {
    id?: number,
    archivoId?: string,
    tipoDeArchivo: TipoDeArchivo,
    perfilId: number,
    fechaDeCreacion: string
}
