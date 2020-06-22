import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'kilosTextoA'
})
export class KilosTextoAPipe implements PipeTransform {

	transform(value: any, args?: any): any {
		switch (value) {
			case 'tn':
				if (args && args == 'largo') {
					return 'Toneladas';
				} else {
					return 'Tn';
				}

			case 'qq':
				if (args && args == 'largo') {
					return 'Quintales';
				} else {
					return 'QQ';
				}

			case 'kg':
				if (args && args == 'largo') {
					return 'Kilogramos';
				} else {
					return 'Kg';
				}

			default:
				if (args && args == 'largo') {
					return 'Toneladas';
				} else {
					return 'Tn';
				}
		}
	}

}
