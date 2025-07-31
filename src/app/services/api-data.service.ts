import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  private apiURL = 'http://recrutory-web-dev.cloudapp.net:8080/recrutory/';

  constructor(private http: HttpClient) { }

  queryGet<T>(url: string): Observable<T> {
    const fullURL = this.apiURL + url;
    return this.http.get<T>(fullURL).pipe(
      tap(() => console.log('API data got, request successful')),
      catchError(this.handleError)
    );
  }

  queryPost<T>(url: string, data: any): Observable<T> {
    const fullURL = this.apiURL + url;
    return this.http.post<T>(fullURL, data).pipe(
      tap(() => console.log('API post successful')),
      catchError(this.handleError)
    );
  }

  queryPut<T>(url: string, data: any): Observable<T> {
    const fullURL = this.apiURL + url;
    return this.http.put<T>(fullURL, data).pipe(
      tap(() => console.log('API put successful')),
      catchError(this.handleError)
    );
  }

  queryDelete<T>(url: string): Observable<T> {
    const fullURL = this.apiURL + url;
    return this.http.delete<T>(fullURL).pipe(
      tap(() => console.log('API delete successful')),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('No API data returned, check your internet connection or try later.', error);
    return throwError(() => error);
  }
}
