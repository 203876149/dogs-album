import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  getAllBreeds() {
    return this.http.get<{ message: Record<string, string[]>, status: string }>('https://dog.ceo/api/breeds/list/all');
  }

  getBreedImagesCollection(breed: string, count: number) {
    return this.http.get<{ message: string[], status: string }>(`https://dog.ceo/api/breed/${breed}/images/random/${count}`);
  }
}
