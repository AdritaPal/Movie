import { Component, OnInit } from '@angular/core';
import { api } from '../config';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.css']
})
export class TopRatedComponent implements OnInit {

  apiResponse: any;
  Rated1: any=[];
  Rated2: any=[];
  Rated3: any=[];
  imageAPI = api.imageAPI;
  
  
  constructor(public restApi: RestApiService) { }

  ngOnInit(): void {
    this.restApi.getToprated1()
    .subscribe((data: {}) =>{
      this.apiResponse = data;
      console.warn(data);
      this.Rated1 = data;
    });
    this.restApi.getToprated2()
    .subscribe((data: {}) =>{
      this.apiResponse = data;
      console.warn(data);
      this.Rated2 = data;
    });
    this.restApi.getToprated3()
    .subscribe((data: {}) =>{
      this.apiResponse = data;
      console.warn(data);
      this.Rated3 = data;
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
