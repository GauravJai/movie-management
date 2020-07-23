import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  baseUrl: string = '';
  queryUrl: string = '?search=';

  constructor(private http: HttpClient) { }

  search(terms: Observable<string>) {
    return terms.pipe(debounceTime(400),
      distinctUntilChanged(), switchMap(term => this.searchEntries(term)));
  }

  searchEntries(term) {
    return this.http
      .get(this.baseUrl + this.queryUrl + term)/* .
      pipe(map((data: any) => data.results)) */;
  }
}
