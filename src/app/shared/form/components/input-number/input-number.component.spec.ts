// import { ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { InputNumberComponent } from './input-number.component';
// import { inputBinding, provideZonelessChangeDetection, signal } from '@angular/core';
//
// describe('InputNumberComponent', () => {
//   let component: InputNumberComponent;
//   let fixture: ComponentFixture<InputNumberComponent>;
//
//   const inputId = signal('id');
//   const inputLabel = signal('label');
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [InputNumberComponent],
//       providers: [provideZonelessChangeDetection()],
//     }).compileComponents();
//
//     fixture = TestBed.createComponent(InputNumberComponent, {
//       bindings: [inputBinding('id', inputId), inputBinding('label', inputLabel)],
//     });
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputNumberComponent } from './input-number.component';
import { Component, inputBinding, provideZonelessChangeDetection, signal } from '@angular/core';

const inputMin = signal(2);
const inputMax = signal(10);

@Component({
  template: `
    <form [formGroup]="form">
      <one-input-number
        labelPosition="left"
        id="jours"
        label="Jours"
        formControlName="jours"
      ></one-input-number>
    </form>
  `,
  imports: [ReactiveFormsModule, InputNumberComponent],
})
class TestHostComponent {
  form = new FormGroup({
    jours: new FormControl<number | null>(null),
  });
}

describe('InputNumberComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let inputEl: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, InputNumberComponent, TestHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent, {
      bindings: [inputBinding('min', inputMin), inputBinding('max', inputMax)],
    });
    host = fixture.componentInstance;
    fixture.detectChanges();

    inputEl = fixture.nativeElement.querySelector('input');
  });

  function setInputValue(value: string) {
    inputEl.value = value;
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  it('devrait être créé', () => {
    expect(fixture).toBeTruthy();
    expect(inputEl).toBeTruthy();
  });

  it('doit être activé par défaut', () => {
    expect(inputEl.disabled).toBeFalse();
  });

  it('peut être désactivé et réactivé via form.disable()/enable()', () => {
    host.form.disable();
    fixture.detectChanges();
    expect(inputEl.disabled).toBeTrue();

    host.form.enable();
    fixture.detectChanges();
    expect(inputEl.disabled).toBeFalse();
  });

  it('accepte une valeur par défaut', () => {
    host.form = new FormGroup({
      jours: new FormControl(5),
    });
    fixture.detectChanges();
    const newInput = fixture.nativeElement.querySelector('input');
    expect(newInput.value).toBe('5');
  });

  it('peut patcher une valeur via le form', () => {
    host.form.patchValue({ jours: 7 });
    fixture.detectChanges();
    expect(inputEl.value).toBe('7');
  });

  it('peut changer sa valeur via l’UI', () => {
    setInputValue('12');
    expect(host.form.value.jours).toBe(12);
  });

  it('met la valeur à null si on efface le champ', () => {
    setInputValue('');
    expect(host.form.value.jours).toBeNull();
  });

  it('peut reset sa valeur via form.reset', () => {
    host.form.setValue({ jours: 3 });
    fixture.detectChanges();
    expect(inputEl.value).toBe('3');

    host.form.reset();
    fixture.detectChanges();
    expect(inputEl.value).toBe('');
    expect(host.form.value.jours).toBeNull();
  });

  it('doit respecter min et max définis dans le composant', () => {
    fixture.detectChanges();

    expect(inputEl.getAttribute('min')).toBe('2');
    expect(inputEl.getAttribute('max')).toBe('10');
  });

  it('doit marquer le champ comme touched après blur', () => {
    spyOn(host.form.get('jours')!, 'markAsTouched').and.callThrough();

    inputEl.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(host.form.get('jours')!.touched).toBeTrue();
  });
});
