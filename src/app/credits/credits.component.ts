import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {RestApiService} from '../rest-api.service';


@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {

  movieId = this.router.snapshot.params['movie-id'];
  credits: any= {};



  constructor(
    public restApi: RestApiService,    
    public router: ActivatedRoute,

  ) { }

  ngOnInit()  {
    this.restApi.getCredits(this.movieId)
    .subscribe((data: {}) => {
      this.credits = data;
    })

  }

}
