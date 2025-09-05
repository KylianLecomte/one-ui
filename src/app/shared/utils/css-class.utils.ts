import { LabelPosition } from '../dtos/label-position.type';

export function getCssClassForLabelPosition(position: LabelPosition): string {
  switch (position) {
    case 'top':
      return 'flex-col';
    case 'bottom':
      return 'flex-col-reverse';
    case 'left':
      return 'flex-row';
    case 'right':
      return 'flex-row-reverse';
    default:
      return '';
  }
}
