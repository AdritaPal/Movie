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
  sortBy='&sort_by='
  filter: Array<number> = [];
  f = ''
  imageAPI = api.imageAPI;
  constructor(private head: HeaderComponent,
    private restApi: RestApiService,
    private router: Router) {       
  }

  ngOnInit(): void {

    this.s=this.restApi.sort;
    this.filter=this.restApi.filter;
    if(this.filter){
      this.f = '&with_genre='
      for(let i=0; i<this.filter.length;i++){
        if(this.filter.indexOf(i) != this.filter.length-1){
        this.f = this.f+i+',';
        }
        else{
          this.f = this.f+i
        }
      }
    }
    if(this.s){
      this.sortBy=this.sortBy+this.s;
    }
    else{
      this.sortBy=this.sortBy+'&sort_by=popularity.desc';
    }
    console.log(this.s)
    this.restApi.discoverMovies(this.sortBy+this.filter)
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
  
}
