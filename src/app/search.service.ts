import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { api } from './config';
import { list } from './list';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient,
    private route: Router
  ) { }

  url=api.apiUrl;
  key=api.apiKey;
  searchWord=api.searchWord;

  getSearchedMovies(): Observable<list> {
    return this.http.get<list>(`${this.url}search/movie?api_key=${this.key}&page=1&query=${this.searchWord}`)
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
