import { Pipe, PipeTransform } from '@angular/core';
import { isNumber } from 'util';

@Pipe({
  name: 'numeroAKilos'
})
export class NumeroAKilosPipe implements PipeTransform {

  // el pipe transforma número a kilos
  // valores posibles de args = tn, qq, kg
  transform(value: any, args?: any): any {

    if (!isNaN(value) && isNumber(value)) {

      switch (args) {
        case 'tn':
          return this.kilosDeToneladas(value);

        case 'qq':
          return this.kilosDeQuintales(value);

        case 'kg':
          return value;

        default:
          return this.kilosDeToneladas(value);
      }

    } else {
      return null;
    }
  }


  kilosDeToneladas(toneladas: number) {
    return toneladas * 1000;
  }

  kilosDeQuintales(quintales: number) {
    return quintales * 100;
  }

}
