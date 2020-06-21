import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneda'
})
export class MonedaPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 'P':
        return 'ARS';

      default:
        return 'USD';
    }
  }

}
