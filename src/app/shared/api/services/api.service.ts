import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JSONObject } from '../domain/dtos/api.dtos';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private _showInfoLog: boolean = true; // TODO variabiliser par environnement

  constructor() {}

  private _baseApiUrl: string = '';

  set baseApiUrl(url: string) {
    this._baseApiUrl = url;
  }

  get<T>(
    url: string,
    nextCallback: (data: T) => void,
    errorCallback?: (error: JSONObject) => void,
  ): void {
    this.httpClient.get<T>(this._baseApiUrl + url).subscribe({
      next: (res: T): void => {
        if (this._showInfoLog) {
          this.info(url, res as JSONObject);
        }
        nextCallback(res);
      },
      error: (error: JSONObject): void => {
        //TODO Toast en cas d'erreur
        this.error(url, error);
        if (errorCallback) {
          errorCallback(error);
        }
      },
    });
  }

  get2<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(this._baseApiUrl + url).pipe(
      tap((res: T) => {
        if (this._showInfoLog) {
          this.info(url, res as JSONObject);
        }
      }),
      catchError((error) => {
        this.error(url, error);
        return throwError(() => error);
      }),
    );
  }

  post<T>(
    url: string,
    data: T,
    nextCallback: (data: T) => void,
    errorCallback?: (error: JSONObject) => void,
  ): void {
    this.httpClient.post<T>(this._baseApiUrl + url, data).subscribe({
      next: (res: T): void => {
        if (this._showInfoLog) {
          this.info(url, res as JSONObject);
        }
        nextCallback(res);
      },
      error: (error: JSONObject): void => {
        //TODO Toast en cas d'erreur
        this.error(url, error);
        if (errorCallback) {
          errorCallback(error);
        }
      },
    });
  }

  post2<T>(url: string, data: T): Observable<T> {
    return this.httpClient.post<T>(this._baseApiUrl + url, data).pipe(
      tap((res: T) => {
        if (this._showInfoLog) {
          this.info(url, res as JSONObject);
        }
      }),
      catchError((error) => {
        this.error(url, error);
        return throwError(() => error);
      }),
    );
  }

  put<T>(
    url: string,
    data: T,
    nextCallback: (data: T) => void,
    errorCallback?: (error: JSONObject) => void,
  ): void {
    this.httpClient.put<T>(this._baseApiUrl + url, data).subscribe({
      next: (res: T): void => {
        if (this._showInfoLog) {
          this.info(url, res as JSONObject);
        }
        nextCallback(res);
      },
      error: (error: JSONObject): void => {
        //TODO Toast en cas d'erreur
        this.error(url, error);
        if (errorCallback) {
          errorCallback(error);
        }
      },
    });
  }

  put2<T>(url: string, data: T): Observable<T> {
    return this.httpClient.put<T>(this._baseApiUrl + url, data).pipe(
      tap((res: T) => {
        if (this._showInfoLog) {
          this.info(url, res as JSONObject);
        }
      }),
      catchError((error) => {
        this.error(url, error);
        return throwError(() => error);
      }),
    );
  }

  delete<T>(
    url: string,
    nextCallback: () => void,
    errorCallback?: (error: JSONObject) => void,
  ): void {
    this.httpClient.delete<T>(this._baseApiUrl + url).subscribe({
      next: (): void => {
        if (this._showInfoLog) {
          this.info(url, {});
        }
        nextCallback();
      },
      error: (error: JSONObject): void => {
        //TODO Toast en cas d'erreur
        this.error(url, error);
        if (errorCallback) {
          errorCallback(error);
        }
      },
    });
  }

  delete2<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(this._baseApiUrl + url).pipe(
      tap(() => {
        if (this._showInfoLog) {
          this.info(url, {});
        }
      }),
      catchError((error) => {
        this.error(url, error);
        return throwError(() => error);
      }),
    );
  }

  //TODO Mettre dans un logger
  info(url: string, data: JSONObject): void {
    console.log(url, data);
  }

  error(url: string, error: JSONObject): void {
    console.error(url, error);
  }
}
