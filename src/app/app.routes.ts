import { Routes } from '@angular/router';
import {AllBreedsResolver} from './search/all-breeds.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  },
  {
    path: 'search',
    loadComponent: () => import('./search/search.component').then(m => m.SearchComponent),
    resolve: {
      allBreeds: AllBreedsResolver
    }
  },
  {
    path: 'request',
    loadComponent: () => import('./request/request.component').then(m => m.RequestComponent),
  }
];
