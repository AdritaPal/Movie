import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {Details} from './details';
import {api} from './config';
import {list} from './list';
import {Credits} from "./credits";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(
    private http: HttpClient,
    private route: Router
    ) { }

  url=api.apiUrl;
  key=api.apiKey;

  getTrendingMoviesWeek(): Observable<list> {
    return this.http.get<list>(`${this.url}trending/all/week?api_key=${this.key}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getTrendingMoviesDay(): Observable<list> {
    return this.http.get<list>(`${this.url}trending/all/day?api_key=${this.key}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getMovieDetails(id: number): Observable<Details> {
    return this.http.get<Details>(`${this.url}movie/${id}?api_key=${this.key}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  

  getCredits(id: number): Observable<Credits> {
    return this.http.get<Credits>(`${this.url}movie/${id}/credits?api_key=${this.key}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  
  


  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {

      errorMessage = error.error.message;
    } else {

      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

 
}
