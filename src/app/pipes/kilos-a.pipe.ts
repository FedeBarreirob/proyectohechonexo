import { Pipe, PipeTransform } from '@angular/core';
import { isNumber } from 'util';

@Pipe({
	name: 'kilosA'
})
export class KilosAPipe implements PipeTransform {

	// el pipe transforma kilos a tonelada o quintal
	// valores posibles de args = tn, qq
	transform(value: any, args?: any): any {

		if (!isNaN(value) && isNumber(value)) {

			switch (args) {
				case 'tn':
					return this.toneladas(value);

				case 'qq':
					return this.quintales(value);

				default:
					return value;
			}

		} else {
			return null;
		}
	}

	// funcion que devuelve las toneladas equivalentes de kilos dados
	toneladas(kilos: number): number {
		return kilos / 1000;
	}

	// funcion que devuelve las quintales equivalentes de kilos dados
	quintales(kilos: number): number {
		return kilos / 100;
	}

}
