import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'consumptionFormat', standalone: true })
export class ConsumptionFormatPipe implements PipeTransform {
  transform(value: number | null | undefined, unit: 'km/l' | 'l/100km' = 'km/l'): string {
    if (value == null || isNaN(value)) return '';
    const formatted = value.toFixed(2);
    return unit === 'km/l' ? `${formatted} km/l` : `${formatted} L/100km`;
  }
}
