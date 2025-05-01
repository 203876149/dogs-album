import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckbox} from '@angular/material/checkbox';
import {AsyncPipe} from '@angular/common';
import {MatCard, MatCardAvatar, MatCardHeader, MatCardImage, MatCardTitle} from '@angular/material/card';
import {MatProgressBar} from '@angular/material/progress-bar';
import {filter, map, Observable} from 'rxjs';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-request',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatCheckbox, AsyncPipe, MatCard,
    MatCardAvatar, MatCardHeader, MatCardImage, MatCardTitle, MatProgressBar, MatButtonModule, MatProgressSpinner],
  templateUrl: './request.component.html',
  styleUrl: './request.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        animate('2s ease', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class RequestComponent {

  form = new FormGroup({
    weight: new FormControl<number>(1, [Validators.min(1), Validators.max(100), Validators.required, Validators.pattern(/^[0-9]+$/)]),
    color: new FormControl<EColor | null>(null, [Validators.required]),
    firstAdoption: new FormControl<boolean>(false, [Validators.required]),
    age: new FormControl<number>(1, [Validators.min(1), Validators.max(20), Validators.required, Validators.pattern(/^[0-9]+$/)]),
  });

  errorMessages$: Observable<Record<string, string>> = this.form.statusChanges
    .pipe(
      filter(status => status === 'INVALID'),
      map(() => {
        const errors: Record<string, string> = {};
        Object.entries(this.form.controls).forEach(([ctrKey, value]) => {
          const errorKey = value.errors ? Object.keys(value.errors)[0] : null
              switch (errorKey) {
                case null:
                  break;
                 case 'required':
                   errors[ctrKey] = 'This field is required';
                   break;
                 case 'min':
                  errors[ctrKey] = `Minimum value is ${value.errors?.['min'].min}`;
                  break;
                case 'max':
                  console.log('max:', value.errors);
                  errors[ctrKey] = `Maximum value is ${value.errors?.['max'].max}`;
                  break;
                case 'pattern':
                  errors[ctrKey] = 'Invalid format';
                  break;
                default:
                  errors[ctrKey] = 'Unknown error';
              }
        });
        return errors;
      })
    );

  submitEvent = signal<'processing' | 'success' | null>(null);


  constructor() {
    this.form.get('firstAdoption')?.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(res => {
        if (res) {
          this.form.get('age')?.setValidators([Validators.min(1), Validators.max(8), Validators.required, Validators.pattern(/^[0-9]+$/)]);
        } else {
          this.form.get('age')?.setValidators([Validators.min(1), Validators.max(20), Validators.required, Validators.pattern(/^[0-9]+$/)]);
        }
        this.form.get('age')?.updateValueAndValidity();
      });
  }

  onSubmit() {
    this.form.reset();
    this.submitEvent.set('processing');
      setTimeout(() => {
        this.submitEvent.set('success');
        setTimeout(() => {
          this.submitEvent.set(null);
        }, 3000);
      }, 2000);
  }


  protected readonly Object = Object;
  EColors = EColor;
}


export enum EColor {
  White = 'White',
  Black = 'Black',
  Brown = 'Brown',
  Golden = 'Golden',
  Gray = 'Gray',
  Mixed = 'Mixed'
}
