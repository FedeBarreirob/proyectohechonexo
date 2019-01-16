import { Injectable } from '@angular/core';
import { ExcelService } from '../sharedServices/exportadores/excel/excel.service';
import { PdfService } from '../sharedServices/exportadores/pdf/pdf.service';
import { DecimalPipe } from '@angular/common';
import { MovimientoOtroMovimiento, TotalOtrosMovimientos } from '../../interfaces/otros-movimientos/listado-otros-movimientos';

@Injectable({
	providedIn: 'root'
})
export class OtrosMovimientosExportacionesService {

	constructor(
		private excelService: ExcelService,
		private pdfService: PdfService,
		private decimalPipe: DecimalPipe
	) { }

	// funcion que exporta a excel un movimiento de otros movimientos
	exportarVentasDetalleExcel(movimiento: MovimientoOtroMovimiento) {
		try {
			let listado: Array<MovimientoOtroMovimiento> = [];
			listado.push(movimiento);

			this.excelService.exportAsExcelFile(listado, "otros-movimientos");
		} catch (e) {
			console.log(e);
		}
	}

	// funcion que exporta a pdf un movimiento de otros movimientos
	exportarVentasDetallePDF(movimiento: MovimientoOtroMovimiento) {
		try {
			this.pdfService.objetoAPdf(
				movimiento,
				"Detalle de otros movimientos",
				["Concepto", "Valor"],
				"otros-movimientos-detalle"
			);
		} catch (e) {
			console.log(e);
		}
	}

	// funcion que exporta a excel un listado de otros movimientos
	exportarListadoVentasDetalleExcel(movimimentos: Array<MovimientoOtroMovimiento>) {
		try {
			this.excelService.exportAsExcelFile(movimimentos, "otros-movimientos");
		} catch (e) {
			console.log(e);
		}
	}

	// funcion que exporta a pdf un movimiento de ventas detalle
	exportarListadoVentasDetallePDF(movimimentos: Array<MovimientoOtroMovimiento>, totales: TotalOtrosMovimientos) {
		try {

			let rows = [];
			let opciones = [];
			let columnas = [];

			// listado de movimientos
			// .. preparar datos
			let movimientosRows = [];
			for (let movimiento of movimimentos) {
				movimientosRows.push([
					`${movimiento.especie} ${movimiento.cosecha}`,
					movimiento.fechaComprobante,
					`${this.decimalPipe.transform(movimiento.kgEntradas, '.2')} Kg`,
					`${this.decimalPipe.transform(movimiento.kgSalidas, '.2')} Kg`
				]);
			}
			rows.push(movimientosRows);

			// .. preparar opciones
			let movimientosOpciones = {
				startY: 30,
				columnStyles: {
					0: { columnWidth: '25%', halign: 'left' },
					1: { columnWidth: '25%', halign: 'left' },
					2: { columnWidth: '25%', halign: 'right' },
					3: { columnWidth: '25%', halign: 'right' }
				}
			};
			opciones.push(movimientosOpciones);

			// .. columnas
			let movimientosColumnas = ["Especia/Cosecha", "Fecha Compr.", "Kg.Entrada", "Kg.Salida"];
			columnas.push(movimientosColumnas);

			// totales
			// .. preparar datos
			let totalesRow = [];
			totalesRow.push(
				[
					"Total Kg. Entrada",
					`${this.decimalPipe.transform(totales.totalKgEntradas, '.2')} Kg`
				]
			);
			totalesRow.push(
				[
					"Total Kg. Salida",
					`${this.decimalPipe.transform(totales.totalKgSalidas, '.2')} Kg`
				]
			);
			rows.push(totalesRow);

			// .. preparar opciones
			let totalesOpciones = {
				startY: 30,
				columnStyles: {
					0: { columnWidth: '50%', halign: 'left' },
					1: { columnWidth: '50%', halign: 'right' },
				}
			};
			opciones.push(totalesOpciones);

			// .. columnas
			let totalesColumnas = ["Concepto", "Valor"];
			columnas.push(totalesColumnas);

			// renderizar
			this.pdfService.listaMultipleAPdf(
				rows,
				"Otros movimientos",
				columnas,
				"otros-movimientos",
				opciones
			);
		} catch (e) {
			console.log(e);
		}
	}
}
