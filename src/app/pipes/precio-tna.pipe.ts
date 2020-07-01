import { Pipe, PipeTransform } from '@angular/core';
import { isNumber } from 'util';

@Pipe({
  name: 'precioTNA'
})
export class PrecioTNAPipe implements PipeTransform {

  /**
   * Devuelve el precio por unidad indicada, la conversión la realiza desde el precio por tn
   * @param value importe correspondiente a un tn
   * @param args unidad destino: qq, tn, kg
   */
  transform(value: any, args?: any): any {
    if (!isNaN(value) && isNumber(value)) {

      switch (args) {
        case 'tn':
          return value;

        case 'kg':
          return this.precioPorKg(value);

        case 'qq':
          return this.precioPorQQ(value);

        default:
          return value;
      }

    } else {
      return null;
    }
  }

  /**
   * Devuelve el precio por kg
   * @param precio Precio por tn
   */
  precioPorKg(precio: number): number {
    return precio / 1000;
  }

  /**
   * Devuelve el precio por qq
   * @param precio Precio por tn
   */
  precioPorQQ(precio: number): number {
    return precio / 10;
  }

}
