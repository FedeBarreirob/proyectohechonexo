import { TerceroBasicoCredencial } from "./tercero-credencial";

export interface TerceroBasico {
    id: number,
    descripcion: string,
    perfilId: number,
    credencial: TerceroBasicoCredencial
}