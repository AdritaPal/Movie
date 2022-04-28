import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'; 
import { RestApiService } from '../rest-api.service';
import { HeaderService } from '../header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  value = '';
  genre: any=[];
  onEnter(value: string) { 
    this.value = value; 
    this.route.navigate(['/search/'+value])

  }

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

  sortBy(sort: string) {
    this.sort=sort;
    this.restApi.sort=this.sort;
    this.route.navigate(['/view'])
    
  }
  


}
