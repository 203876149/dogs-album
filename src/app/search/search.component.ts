import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SearchService} from './search.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {filter, map, Observable, switchMap} from 'rxjs';
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
    count: new FormControl(10, [Validators.min(1), Validators.max(50)]),
  });

  images$: Observable<string[]> = this.form?.valueChanges.pipe(
    filter((value) => this.form.valid && !!value?.breed),
    switchMap((value) => this.searchService.getBreedImagesCollection(value.breed as string, value.count as number)
      .pipe(
        map(({message}) => message)
      )
    )
  )

  ngOnInit() {
    console.log(this.allBreeds);
    this.form?.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

}
