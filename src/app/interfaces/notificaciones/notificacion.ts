import { ComprobanteNovedad } from "./comprobante-novedad";
import { ConfirmacionDeVentaNovedad } from "./confirmacion-de-venta-novedad";

export interface Notificacion {
	id?: number,
	cuerpoMensaje?: string,
	estado?: number,
	fechaHora?: Date
	comprobanteNovedades?: Array<ComprobanteNovedad>,
	confirmacionesVentasNovedades?: ConfirmacionDeVentaNovedad
}
