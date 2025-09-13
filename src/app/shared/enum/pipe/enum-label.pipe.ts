import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumLabel',
})
export class EnumLabelPipe implements PipeTransform {
  transform<T extends string>(value: T | null | undefined, labels: Record<T, string>): string {
    if (!value) return '';
    return labels[value] ?? value;
  }
}
