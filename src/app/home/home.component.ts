import { Component, OnInit } from '@angular/core';
import { api } from '../config';
import {RestApiService} from '../rest-api.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  apiResponse: any;
  Week: any=[];
  Day: any=[];
  imageAPI = api.imageAPI;
  page: number = 1;


  onScroll() {
    console.log("scrolled!!");
    this.page += 1;
  }
  
  constructor(public restApi: RestApiService) { 
  }

  ngOnInit(): void {
    this.restApi.getTrendingMoviesWeek()
    .subscribe((data: {}) => {
      console.warn(data);
      this.Week = data;
    });

    this.restApi.getTrendingMoviesDay(this.page)
    .subscribe((data: {}) => {
      this.apiResponse = data;
      console.warn(data);
      this.Day = data;
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

  


