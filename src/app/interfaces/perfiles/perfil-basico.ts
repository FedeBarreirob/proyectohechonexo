import { PerfilBasicoCredencial } from "./perfil-basico-credencial";
import { Rol } from "../security/rol";
import { PerfilBasicoInfoPersonal } from "./perfil-basico-informacion-personal";

export interface PerfilBasico {
    credencial: PerfilBasicoCredencial,
    rol: Rol,
    informacionPersonal: PerfilBasicoInfoPersonal,
    entidadCodigos: Array<string>,
    comercialesVinculados: Array<PerfilBasico>
}