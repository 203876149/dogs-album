import {Resolve} from '@angular/router';
import {Injectable} from '@angular/core';
import {SearchService} from './search.service';
import {map, Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AllBreedsResolver implements Resolve<any> {
  constructor(private searchService: SearchService) {}
  resolve(): Observable<Array<{ breed: string, subBreeds: string[] }>> {
    return this.searchService.getAllBreeds().pipe(
      map(res => {
          return Object.entries(res?.message)
            .filter(([key, value]) => value?.length)
            .map(([key, value]) => {
            return {
              breed: key,
              subBreeds: value,
            }
          })
        }
      )
    )
  }
}
