import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'netasA'
})
export class NetasAPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 'tn':
        return 'netas';

      default:
        return 'netos';
    }
  }

}
