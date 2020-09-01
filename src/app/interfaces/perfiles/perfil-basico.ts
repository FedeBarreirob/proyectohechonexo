import { PerfilBasicoCredencial } from "./perfil-basico-credencial";
import { Rol } from "../security/rol";
import { PerfilBasicoInfoPersonal } from "./perfil-basico-informacion-personal";
import { EntidadAlg } from "./entidad-alg";
import { IndicadorCargaLegajo } from "../legajo/indicador-carga-legajo";

export interface PerfilBasico {
    credencial?: PerfilBasicoCredencial,
    rol?: Rol,
    informacionPersonal?: PerfilBasicoInfoPersonal,
    entidadCodigos?: Array<EntidadAlg>,
    comercialesVinculados?: Array<PerfilBasico>,
    subtipo?: string,
    identidadValidada?: boolean,
    indicadorCargaLegajo?: IndicadorCargaLegajo
}