import { Component, OnInit } from '@angular/core';
import {NavigationStart, Router} from '@angular/router'; 
import { RestApiService } from '../rest-api.service';
import { HeaderService } from '../header.service';
import { Options } from "@angular-slider/ngx-slider";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  value1 = '';
  genre: any=[];
  lang: any=[];
  'g_id': Array<number> = [];
  'g_name': Array<string> = [];
  selected = 'None';

  onEnter(value: string) { 
    this.value1 = value; 
    this.route.navigate(['/search/'+value])

  }
  color='aliceblue'
  sort: any='';

  constructor(private route: Router,
    private restApi:RestApiService,
    public head: HeaderService) { 
      route.events.forEach((event) => {
        if (event instanceof NavigationStart) {
          if (event['url'] == '/login' || event['url'] == '/register' ) {
            this.show = false;
          } else {
            this.show = true;
          }
        }
      });
    }

  ngOnInit(): void {
    this.restApi.getGenres()
    .subscribe((data: {}) => {
      console.warn(data);
      this.genre = data;
    });

    this.restApi.getLanguage()
    .subscribe((data: {}) => {
      console.warn(data);
      this.lang = data;
    });

  }

  value: number = 0;
  highValue: number = 10;
  options: Options = {
    floor: 0,
    ceil: 10
  };

  show=false;
  name=''; 

  valueChange(value: number, highValue: number): void {
    this.value = value
    this.highValue= highValue;
    console.log(this.value, this.highValue)
  }
  sortBy(sort: string): string {
    this.sort=sort;
    if(sort == 'original_title.asc'){
      this.name='Title (A - Z)'
    }
    if(sort == 'original_title.desc'){
      this.name='Title (Z - A)'
    }
    if(sort == 'release_date.desc'){
      this.name='Release Date Descending'
    }
    if(sort == 'release_date.asc'){
      this.name='Release Date Ascending'
    }
    if(sort == 'vote_average.desc'){
      this.name='Critic Rating Descending'
    }
    if(sort == 'vote_average.asc'){
      this.name='Critic Rating Ascending'
    }
    return this.name;
    
  }
  
  getGenre(id: number, name: string): Array<string>{
    if(this.g_id.indexOf(id) == -1){
      
      this.g_id.push(id);
      this.g_name.push(name);

    }
    else{
      this.g_id.splice(this.g_id.indexOf(id),1);
      this.g_name.splice(this.g_name.indexOf(name),1);


    }    

    return this.g_name;
  }

   'year': number;

  
  
  submit(){
    this.restApi.filter=this.g_id;
    this.restApi.year=this.year;
    this.restApi.sort=this.sort;
    this.restApi.low=this.value;
    this.restApi.high=this.highValue;
    this.restApi.lang=this.selected;
    this.route.navigate(['/view']);
  }

}