import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SearchService} from './search.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {map, Observable, of, switchMap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, AsyncPipe, MatCardModule],
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
    breed: new FormControl('', [Validators.required]),
    count: new FormControl(0, [Validators.min(1), Validators.max(50), Validators.required, Validators.pattern(/^[0-9]+$/)]),
  });

  images$: Observable<string[]> = this.form?.valueChanges.pipe(
    switchMap((value) =>
      (this.form.valid) ? this.searchService.getBreedImagesCollection(value.breed as string, value.count as number)
          .pipe(
            map((res) => res?.message || []),
          )
        : of([])
      )
    )


  ngOnInit() {
    this.images$.subscribe(res => console.log('images:', res));

  }

}
