import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {

  constructor(private service: HttpClient,
    public notifier: NotifierService) { }

  getAll(endpoint: string): Observable<T[]> {
    return this.service.get<T[]>(`${endpoint}`);
  }

  getAllCustom(endpoint: string): Observable<T[]> {
    return this.service.get<T[]>(`${endpoint}`);
  }

  getAllFemales(endpoint: string): Observable<T[]> {
    return this.service.get<T[]>(`${endpoint}`);
  }

  get(endpoint: string, id: number): Observable<T> {
    return this.service.get<T>(`${endpoint}/${id}`);
  }

  getByName(endpoint: string, name: string): Observable<T> {
    return this.service.get<T>(`${endpoint}?name=${name}`);
  }

  create(endpoint: string, item: T): Observable<T> {
    return this.service.post<T>(`${endpoint}`, item)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error.error.message);
          return throwError(error.error);
        })
      );

  }

  update(endpoint: string, id: number, item: T): Observable<T> {
    return this.service.put<T>(`${endpoint}/${id}`, item)
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred:', error.error.message);
          return throwError(error.error);
        })
      );

  }

  delete(endpoint: string, id: number): Observable<T> {
    return this.service.delete<T>(`${endpoint}/${id}`);
  }


}

