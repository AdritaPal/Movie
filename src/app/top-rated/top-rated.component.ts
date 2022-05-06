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
  page:number=1;
  temp: any=[];
  imageAPI = api.imageAPI;
  
  
  constructor(public restApi: RestApiService) { }

  ngOnInit(): void {
    this.restApi.getToprated1(this.page)
    .subscribe((data: {}) =>{
      this.apiResponse = data;
      console.warn(data);
      this.Rated1 = data;
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
    this.page += 1;
    this.restApi.getToprated1(this.page)
    .subscribe((data: {}) => {
      this.apiResponse = data;
      console.warn(data);
      this.temp = data;
      this.Rated1.results = [ ...this.Rated1.results, ...this.temp.results]; 
    });
   }
}
