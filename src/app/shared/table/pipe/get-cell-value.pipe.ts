import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getCellValue',
  pure: false,
})
export class GetCellValuePipe implements PipeTransform {
  transform<T = any>(value: T, key: string): string {
    if (value && typeof value === 'object' && key in value) {
      return (value as Record<string, any>)[key];
    }
    return '';
  }
}
