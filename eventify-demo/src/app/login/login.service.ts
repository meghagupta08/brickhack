import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginComponent } from './login.component';
import { User } from '../Models/User';
import { Event } from '../Models/Event';
import { MessageService } from '../../message.service'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://127.0.0.1:5000';
  

  private corsHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    
  ) {}
  

  
  getRecommendedEvents(event: Event): Observable<Event[]> {
    const url = this.baseUrl;
    const params: HttpParams = new HttpParams().set('event', JSON.stringify(event));
    const options = {
      headers: this.corsHeaders,
      params
    };
    console.log(JSON.stringify(event))
    return this.http.get<Event[]>(url+'/getRecommendedEventsForUser',options);
  }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
  
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
  
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
  
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
  }
  
    /** Log a HeroService message with the MessageService */
    private log(message: string) {
      this.messageService.add(`HeroService: ${message}`);
    }
}
