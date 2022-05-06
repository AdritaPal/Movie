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
  pageDay: number = 1;
  pageWeek: number=1
  temp: any=[];


  
  
  constructor(public restApi: RestApiService) { 
  }

  ngOnInit(): void {
    this.restApi.getTrendingMoviesWeek(this.pageWeek)
    .subscribe((data: {}) => {
      console.warn(data);
      this.Week = data;
    });

    this.restApi.getTrendingMoviesDay(this.pageDay)
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

  onScroll() {
    console.log("scrolled!!");
    this.pageDay += 1;
    this.restApi.getTrendingMoviesDay(this.pageDay)
    .subscribe((data: {}) => {
      this.apiResponse = data;
      console.warn(data);
      this.temp = data;
      this.Day.results = [ ...this.Day.results, ...this.temp.results]; 
    });
   }

   onScroll2() {
    console.log("scrolled!!");
    this.pageWeek += 1;
    this.restApi.getTrendingMoviesWeek(this.pageWeek)
    .subscribe((data: {}) => {
      this.apiResponse = data;
      console.warn(data);
      this.temp = data;
      this.Week.results = [ ...this.Week.results, ...this.temp.results]; 
    });
   }
}

  


