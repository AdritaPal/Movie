import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'; 
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
  'g_id': Array<number> = [];
  'g_name': Array<string> = [];
  onEnter(value: string) { 
    this.value1 = value; 
    this.route.navigate(['/search/'+value])

  }
  color='aliceblue'
  sort: any='';

  constructor(private route: Router,
    private restApi:RestApiService,
    public head: HeaderService) { }

  ngOnInit(): void {
    this.restApi.getGenres()
    .subscribe((data: {}) => {
      console.warn(data);
      this.genre = data;
    });

  }

  value: number = 0;
  highValue: number = 10;
  options: Options = {
    floor: 0,
    ceil: 10
  };

  

  valueChange(value: number, highValue: number): void {
    this.value = value
    this.highValue= highValue;
    console.log(this.value, this.highValue)
  }
  sortBy(sort: string) {
    this.sort=sort;
    
    
  }
  
  getGenre(id: number, name: string): Array<string>{
    if(this.g_id.indexOf(id) == -1){
      
      this.g_id.push(id);
      this.g_name.push(name);
      console.log(this.g_id);

    }
    else{
      this.g_id.splice(this.g_id.indexOf(id),1);
      this.g_name.splice(this.g_name.indexOf(name),1);

      console.log(this.g_id);

    }
    

    return this.g_name;
  }

  submit(){
    this.restApi.filter=this.g_id;
    this.restApi.sort=this.sort;
    this.restApi.low=this.value;
    this.restApi.high=this.highValue;
    this.route.navigate(['/view']);
  }

}
