import { Component, OnInit } from '@angular/core';
import { api } from '../config';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {
   
  apiResponse: any;
  Popular: any=[];
  page: number = 1;
  temp: any=[];

  imageAPI = api.imageAPI;


  constructor(public restApi: RestApiService) { }

  ngOnInit(): void {
    this.restApi.getPopular1(this.page)
    .subscribe((data: {}) =>{
      this.apiResponse = data;
      console.warn(data);
      this.Popular = data;
    });
    
  }


  onScroll() {
    console.log("scrolled!!");
    this.page += 1;
    this.restApi.getPopular1(this.page)
    .subscribe((data: {}) =>{
      this.apiResponse = data;
      console.warn(data);
      this.temp = data;
      this.Popular.results = [ ...this.Popular.results, ...this.temp.results]; 
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
