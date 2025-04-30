import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SearchService} from './search.service';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  standalone: true,
})
export class SearchComponent {

  activatedRoute = inject(ActivatedRoute);
  searchService = inject(SearchService);
  allBreeds: Array<{ breed: string, subBreeds: string[] }> = this.activatedRoute.snapshot.data['allBreeds'];

  ngOnInit() {
    console.log(this.allBreeds);
  }

}
