import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckbox} from '@angular/material/checkbox';
import {AsyncPipe} from '@angular/common';
import {MatCard, MatCardAvatar, MatCardHeader, MatCardImage, MatCardTitle} from '@angular/material/card';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-request',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatCheckbox, AsyncPipe, MatCard, MatCardAvatar, MatCardHeader, MatCardImage, MatCardTitle, MatProgressBar],
  templateUrl: './request.component.html',
  styleUrl: './request.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestComponent {

  form = new FormGroup({
    weight: new FormControl<number>(1, [Validators.min(1), Validators.max(100), Validators.required, Validators.pattern(/^[0-9]+$/)]),
    color: new FormControl<EColor>(EColor.White, [Validators.required]),
    firstAdoption: new FormControl<boolean>(false, [Validators.required]),
    age: new FormControl<number>(1, [Validators.min(1), Validators.max(20), Validators.required, Validators.pattern(/^[0-9]+$/)]),
  }, {validators: ageLimitIfFirstAdoption});

  constructor() {
    this.form.get('firstAdoption')?.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(res => {
        if (res) {
          this.form.get('age')?.addValidators(Validators.max(8));
        } else {
          this.form.get('age')?.setValidators(Validators.max(20));
        }
        this.form.get('age')?.updateValueAndValidity();
      });
  }


  protected readonly Object = Object;
  EColors = EColor;
}

export const ageLimitIfFirstAdoption: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const firstAdoption = control.get('firstAdoption')?.value;
  const age = control.get('age')?.value;
  if (firstAdoption === true && age > 8) {
    return { ageTooHighForFirstAdoption: true };
  }
  return null;
};

export enum EColor {
  White = 'White',
  Black = 'Black',
  Brown = 'Brown',
  Golden = 'Golden',
  Gray = 'Gray',
  Mixed = 'Mixed'
}
