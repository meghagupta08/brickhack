import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../Models/User';
import { SignupComponent } from './signup.component';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private baseUrl = 'http://127.0.0.1:5000';
  

  private corsHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  

  constructor(
    private http: HttpClient,
    
  ) {}
  

  
  createUser(user: any): Observable<any> {
    const url = this.baseUrl;
    const options = {
      headers: this.corsHeaders,
    };
    const data = JSON.stringify(user)
    console.log(data)
    return this.http.post<any>(url+'/user/createUser',data,options);
  }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */

}
