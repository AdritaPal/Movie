import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { api } from '../config';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query = this.router.snapshot.params['query'];
  searchResults: any = {};
  imageAPI = api.imageAPI;


  constructor(
    public router: ActivatedRoute,
    public restApi: RestApiService
    ) { }

  ngOnInit(): void {
    this.restApi.getSearchedMovies(this.query)
    .subscribe((data: {}) => {
      this.searchResults = data;
    });

  }
  title(original_title: string, title: string, name: string, original_name: string): string{
    if(original_title){
      return original_title;
    }
    else if(title){
      return title;
    }
    else if(name){
      return name;
    }
    else{
      return original_name;
    }
  }

}
