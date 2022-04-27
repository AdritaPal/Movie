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
  Popular1: any=[];
  Popular2: any=[];
  Popular3: any=[];
  imageAPI = api.imageAPI;


  constructor(public restApi: RestApiService) { }

  ngOnInit(): void {
    this.restApi.getPopular1()
    .subscribe((data: {}) =>{
      this.apiResponse = data;
      console.warn(data);
      this.Popular1 = data;
    });
    this.restApi.getPopular2()
    .subscribe((data: {}) =>{
      this.apiResponse = data;
      console.warn(data);
      this.Popular2 = data;
    });
    this.restApi.getPopular3()
    .subscribe((data: {}) =>{
      this.apiResponse = data;
      console.warn(data);
      this.Popular3 = data;
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
