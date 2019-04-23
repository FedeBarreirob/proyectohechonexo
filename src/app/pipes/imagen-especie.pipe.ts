import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagenEspecie'
})
export class ImagenEspeciePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 'SOJA':
        return 'assets/cereal-filtro/soja.png';

      case 'MAIZ':
        return 'assets/cereal-filtro/maiz.png';

      case 'TRIG':
        return 'assets/cereal-filtro/trigo.png';

      case 'GIRA':
        return 'assets/cereal-filtro/girasol.png';

      case 'AVE':
        return 'assets/cereal-filtro/avena.png';

      default:
        return 'assets/cereal-filtro/otros.png';
    }
  }

}
