import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zeropading'
})
export class ZeropadingPipe implements PipeTransform {

  transform(value: number, size: number = 10): any {
    let s = value + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

}
