import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  Signal,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { GetCellValuePipe } from './pipe/get-cell-value.pipe';
import { FormControl } from '@angular/forms';

export interface DataDef<T = any> {
  data: T;
  form?: FormControl;
}

export interface ColumnDef {
  dataKey: string;
  header?: TemplateRef<unknown>;
  footer?: TemplateRef<unknown>;
  cellTemplate?: TemplateRef<unknown>;
  width?: string;
}

interface ColumnDefWithId extends ColumnDef {
  id: number;
}

@Component({
  selector: 'one-table',
  imports: [NgTemplateOutlet, GetCellValuePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None, // BOFBOF
})
export class TableComponent<T = any> {
  // TODO
  // Sort
  // Filter
  // No header
  // Global header
  // Column header
  // No footer
  // Global footer
  // Column footer
  readonly datas = input.required<DataDef<T>[]>();
  readonly columns = input.required<ColumnDef[]>();
  readonly headerless = input<boolean>(false);
  readonly clickRow = output<T>();

  readonly ColumnDefWithId: Signal<ColumnDefWithId[]> = computed(() => {
    return this.columns().map((c, idx) => ({
      ...c,
      id: idx,
    }));
  });

  onClickRow(data: DataDef<T>): void {
    this.clickRow.emit(data.data);
  }
}
