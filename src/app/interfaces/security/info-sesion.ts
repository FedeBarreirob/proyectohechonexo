import { PerfilBasicoInfoPersonal } from "../perfiles/perfil-basico-informacion-personal";

export interface InfoSesion {
    id?: number,
    entidadCodigo?: string,
    perfil: PerfilBasicoInfoPersonal
}
