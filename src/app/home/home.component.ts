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


  constructor(public restApi: RestApiService) { 
  }

  ngOnInit(): void {
    this.restApi.getTrendingMoviesWeek()
    .subscribe((data: {}) => {
      this.apiResponse = data;
      console.warn(data);
      this.Week = data;
    });

    this.restApi.getTrendingMoviesDay()
    .subscribe((data: {}) => {
      this.apiResponse = data;
      console.warn(data);
      this.Day = data;
    });
  }
}

  


