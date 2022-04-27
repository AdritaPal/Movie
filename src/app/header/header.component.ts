import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'; 
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  value = '';
  genre: any = [];

  onEnter(value: string) { 
    this.value = value; 
    this.route.navigate(['/search/'+value])

  }

  constructor(private route: Router,
    private restApi: RestApiService) { }

  ngOnInit(): void {

    this.restApi.getGenres()
    .subscribe((data: {}) => {
      console.warn(data);
      this.genre = data;
    });
  }
  


}
