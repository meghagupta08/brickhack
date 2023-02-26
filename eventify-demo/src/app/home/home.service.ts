import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Event } from '../Models/Event';


@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseUrl = 'http://127.0.0.1:8080';
  

  private corsHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  

  constructor(
    private http: HttpClient,
  ) {}
  

  
  getUserEvents(email: string): Observable<Event[]> {
    const url = this.baseUrl;
    const params: HttpParams = new HttpParams().set('email', email);
    const options = {
      headers: this.corsHeaders,
      params
    };
    console.log(email)
    return this.http.get<Event[]>(url+'/event/getUserEvents',options);
  }
}

