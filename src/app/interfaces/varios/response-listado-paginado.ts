import { ResponseListadoPaginadoLista } from "./response-listado-paginado-lista";

export interface ResponseListadoPaginado {
    exito: boolean,
    mensaje: string,
    datos: ResponseListadoPaginadoLista,
    idRespuesta?: number
}
