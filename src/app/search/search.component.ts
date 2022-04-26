import { Component, OnInit } from '@angular/core';
import { api } from '../config';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchWord : String = "";
  apiResponse: any;
  imageAPI = api.imageAPI;

  constructor(public searchAPI: SearchService) { }

  ngOnInit(): void {
    this.searchAPI.getSearchedMovies()
    .subscribe((data: {}) => {
      this.apiResponse = data;
      console.warn(data);
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
