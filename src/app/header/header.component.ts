import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  value = '';
  onEnter(value: string) { 
    this.value = value; 
    this.route.navigate(['/search/'+value])

  }

  constructor(private route: Router) { }

  ngOnInit(): void {
    
  }
  


}
