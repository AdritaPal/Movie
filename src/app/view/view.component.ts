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
  imageAPI = api.imageAPI;
  constructor(private head: HeaderComponent,
    private restApi: RestApiService,
    private router: Router) {       
  }

  ngOnInit(): void {

    this.s=this.restApi.sort
    console.log(this.s)
    this.restApi.discoverMovies(this.s,'')
    .subscribe((data: {}) => {
      console.warn(data);
      this.sort = data;
    });
  }

  show(s: string){
    this.s=s;
    console.log(s);
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
