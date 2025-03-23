import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { JSONObject } from '../domain/dtos/api.dtos';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly httpClient: HttpClient = inject(HttpClient);

  constructor() {}

  private _baseApiUrl: string = '';

  set baseApiUrl(url: string) {
    this._baseApiUrl = url;
  }

  get<P>(url: string): Observable<P> {
    return this.httpClient.get<P>(this._baseApiUrl + url).pipe(
      catchError(this.manageError<P>('')),
      tap((data: P): void => {
        //TODO variable env log info
        if (true) {
          this.info(url, data as JSONObject);
        }
      }),
    );
  }

  post<P, R>(url: string, data: P): Observable<R> {
    return this.httpClient.post<R>(this._baseApiUrl + url, data).pipe(
      tap((data: R): void => {
        //TODO variable env log info
        if (true) {
          this.info(url, data as JSONObject);
        }
      }),
    );
  }

  //TODO Mettre dans un logger
  manageError<P>(message: string) {
    return (error: any): Observable<P> => {
      this.error(message, error);
      //TODO toast
      return throwError(() => error);
    };
  }

  info(url: string, data: JSONObject): void {
    console.log(url, data);
  }

  error(url: string, error: JSONObject): void {
    console.error(url, error);
  }
}
