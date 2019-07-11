import { Pipe, PipeTransform } from '@angular/core';
import { isNumber } from 'util';

@Pipe({
  name: 'precioQQA'
})
export class PrecioQQAPipe implements PipeTransform {

  /**
   * Devuelve el precio por unidad indicada, la conversión la realiza desde el precio por quintal
   * @param value importe correspondiente a un quintal
   * @param args unidad destino: qq, tn, kg
   */
  transform(value: any, args?: any): any {
    if (!isNaN(value) && isNumber(value)) {

      switch (args) {
        case 'tn':
          return this.precioPorTn(value);

        case 'kg':
          return this.precioPorKg(value);

        case 'qq':
          return value;

        default:
          return this.precioPorTn(value);
      }

    } else {
      return null;
    }
  }

  /**
   * Devuelve el precio por kg
   * @param precio Precio por quintal
   */
  precioPorKg(precio: number): number {
    return precio / 100;
  }

  /**
   * Devuelve el precio por tn
   * @param precio Precio por quintal
   */
  precioPorTn(precio: number): number {
    return precio * 10;
  }
}
