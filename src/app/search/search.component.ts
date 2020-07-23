import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SearchService } from './../service/search.service';
import { Constants } from '../common/Constants';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService]
})
export class SearchComponent {
  results: any = [];
  searchTerm$ = new Subject<string>();
  baseUrl: string;
  btnValue: string;

  constructor(private searchService: SearchService) {
    this.searchService.search(this.searchTerm$)
      .subscribe((results) => {
        console.log(results);
        this.results = results;
      });
  }

  searchPath(path: any) {
    if (path.target.checked) {
      //this.searchTerm$.next("");
      this.btnValue = path.target.value;
      this.searchService.baseUrl = `${Constants.m2mApiURL+"/search"}/${this.btnValue}`;
    }
  }

}
