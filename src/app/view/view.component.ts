import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RestApiService } from '../rest-api.service';
import { api } from '../config';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  sort: any = [];
  's':string;
  year= this.restApi.year;
  sortBy='&sort_by=';
  filter: Array<number> = [];
  f = ''
  lang = this.restApi.lang;
  low = this.restApi.low;
  high = this.restApi.high;
  page: number=1;
  temp: any=[];


  imageAPI = api.imageAPI;
  constructor(private head: HeaderComponent,
    private restApi: RestApiService,
    private router: Router) {       
  }

  ngOnInit(): void {

    this.s=this.restApi.sort;
    this.filter=this.restApi.filter;
    if(this.filter){
      this.f = '&with_genres='
      console.log(this.filter.length);
      for(let i=0; i<this.filter.length;i++){
        if(i != this.filter.length-1){
        this.f = this.f+this.filter[i]+',';
        }
        else{
          this.f = this.f+this.filter[i];
        }
      }
      console.log(this.f);

    }
    if(this.s){
      this.sortBy=this.sortBy+this.s;
    }
    else{
      this.sortBy=this.sortBy+'&sort_by=popularity.desc';
    }

    if (this.low<=this.high){
      this.f=this.f+'&vote_average.gte='+this.low+'&vote_average.lte='+this.high
    }

    if (this.year>0){
      this.f=this.f + '&primary_release_year='+this.year
      console.log(this.f)
    }
    if(this.lang!= 'None' ){
      this.f+='&with_original_language='+this.lang
    }
    console.log(this.sortBy+this.f)
    this.restApi.discoverMovies(this.sortBy+this.f,this.page)
    .subscribe((data: {}) => {
      console.warn(data);
      this.sort = data;
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
    this.restApi.discoverMovies(this.sortBy+this.f,this.page)
    .subscribe((data: {}) => {
      console.warn(data);
      this.temp = data;
      this.sort.results = [ ...this.sort.results, ...this.temp.results]; 
    });
   
      
   }
}