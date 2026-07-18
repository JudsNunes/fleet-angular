import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'plateFormat', standalone: true })
export class PlateFormatPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    const upper = value.toUpperCase();
    // Mercosul: ABC1D23 → ABC-1D23
    if (/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/.test(upper)) {
      return `${upper.slice(0, 3)}-${upper.slice(3)}`;
    }
    // Old format: ABC1234 → ABC-1234
    if (/^[A-Z]{3}[0-9]{4}$/.test(upper)) {
      return `${upper.slice(0, 3)}-${upper.slice(3)}`;
    }
    return upper;
  }
}
