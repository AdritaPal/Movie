import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RestApiService} from '../rest-api.service';
import {api} from '../config'


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  movieId = this.router.snapshot.params['movie-id'];
  MovieDetails: any = {};
  credits: any= {};
  reviews: any= {};
  imageAPI = api.imageAPI;
  l: any = {};
  lang:any=[];
  language=''

  constructor(
    public router: ActivatedRoute,
    public restApi: RestApiService,
  ) { }

 color= '#081c22'
  ngOnInit() {
    this.restApi.getMovieDetails(this.movieId)
    .subscribe((data: {}) => {
      this.MovieDetails = data;
    });

    this.restApi.getCredits(this.movieId)
    .subscribe((data: {}) => {
      this.credits = data;
    })

    this.restApi.getReviews(this.movieId)
    .subscribe((data: {}) => {
      this.reviews = data;
      console.log(this.reviews);
    })

    this.restApi.getLanguage()
    .subscribe((data: {}) => {
      this.lang = data;
    })

    console.log(this.lang)
  }


  getLang(iso: string):string{
    for(let i=0;i<this.lang.length;i++){
      if(this.lang[i].iso_639_1 == iso){
        this.language = this.lang[i].english_name;
        break;
      }
    }
    console.log(this.language)
    return this.language;
  }

  director(job: string, name: string): string{
    if(job == 'Director'){
      return name;
    }
    else{
      return ''
    }
  }

  writer(job: string, name: string): string{
    if(job == 'Writer'){
      return name;
    }
    else{
      return ''
    }
  }
  gridColumns = 7;
  color1 = 'grey'
  'hour' : number;
  'minutes': number;
  runtime(runtime: number): string{
    this.hour = Math.floor(runtime / 60); 
    this.minutes = runtime - (this.hour * 60);
    return this.hour+'h'+' '+this.minutes+'m'; 
  }



 
}
