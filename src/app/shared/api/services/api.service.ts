import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JSONObject } from '../domain/dtos/api.dtos';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly _showInfoLog: boolean = true; // TODO variabiliser par environnement

  private _baseApiUrl: string = '';

  set baseApiUrl(url: string) {
    this._baseApiUrl = url;
  }

  get<T>(
    url: string,
    nextCallback: (data: T) => void,
    errorCallback?: (error: JSONObject) => void
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

  post<T>(
    url: string,
    data: T,
    nextCallback: (data: T) => void,
    errorCallback?: (error: JSONObject) => void
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

  put<T>(
    url: string,
    data: T,
    nextCallback: (data: T) => void,
    errorCallback?: (error: JSONObject) => void
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

  delete<T>(
    url: string,
    nextCallback: () => void,
    errorCallback?: (error: JSONObject) => void
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

  //TODO Mettre dans un logger
  info(url: string, data: JSONObject): void {
    console.log(url, data);
  }

  error(url: string, error: JSONObject): void {
    console.error(url, error);
  }
}
