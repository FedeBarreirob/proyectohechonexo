import { NuevoPassword } from "./nuevo-password";

export interface CambioPasswordUsuario {
    nombreUsuario: string,
    nuevoPasswordDTO: NuevoPassword
}
