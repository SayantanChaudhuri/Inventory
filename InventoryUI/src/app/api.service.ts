import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  get(requestUrl: string): any {
    return this.http
      .get(requestUrl)
      .pipe(catchError(this.handleError('getAllStores', [])));
  }

  post(requestUrl: string, requestBody: any, timeout?: number): any {
    return this.http.post(requestUrl, requestBody);
  }

  put(requestUrl: string, requestBody: any, timeout?: number): any {
    return this.http.put(requestUrl, requestBody);
  }

  delete(requestUrl: string, requestBody?: any, timeout?: number): any {
    return this.http.delete(requestUrl, requestBody);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
