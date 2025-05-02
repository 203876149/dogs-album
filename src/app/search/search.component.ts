import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SearchService} from './search.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {debounceTime, map, Observable, of, switchMap, tap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, AsyncPipe, MatCardModule, MatProgressBarModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {

  activatedRoute = inject(ActivatedRoute);
  searchService = inject(SearchService);
  allBreeds: Array<{ breed: string, subBreeds: string[] }> = this.activatedRoute.snapshot.data['allBreeds'];
  form = new FormGroup({
    breed: new FormControl<string>('', [Validators.required]),
    count: new FormControl<number>(0, [Validators.min(1), Validators.max(50), Validators.required, Validators.pattern(/^[0-9]+$/)]),
  });
  loading = signal(false);

  images$: Observable<string[]> = this.form?.valueChanges.pipe(
    debounceTime(500),
    tap(() => this.loading.set(true)),
    switchMap((value) =>
      (this.form.valid) ? this.searchService.getBreedImagesCollection(value.breed as string, value.count as number)
          .pipe(
            map((res) => res?.message || []),
          )
        : of([])
      ),
    tap(() => this.loading.set(false))
    )

}
