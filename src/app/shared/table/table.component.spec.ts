import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { inputBinding, provideZonelessChangeDetection, signal } from '@angular/core';

interface dataTableTest {
  id: number;
  name: string;
}

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  const inputDatas = signal([{ data: { id: 1, name: 'test' } }]);
  const inputColumns = signal([{ dataKey: '1' }]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent, {
      bindings: [inputBinding('datas', inputDatas), inputBinding('columns', inputColumns)],
    });
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
