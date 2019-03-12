import { ComprobanteNovedad } from "./comprobante-novedad";

export interface Notificacion {
	id?: number,
	cuerpoMensaje?: string,
	estado?: number,
	fechaHora?: Date
	comprobanteNovedades?: Array<ComprobanteNovedad>
}
