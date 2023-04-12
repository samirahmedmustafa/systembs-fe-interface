import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // Check if the error is a server error (status code 5xx)
          if (error.status >= 500) {
            console.error('Server error:', error);
            // Handle the error and return a user-friendly error message
            const errorMessage = 'Something went wrong. Please try again later.';
            return throwError(errorMessage);
          } else {
            // Return the error response as is
            console.log(`catchError:`, error)
            return throwError(error);
          }
        })
      );
  }

}
