import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Event} from '../Models/Event'


@Injectable({
  providedIn: 'root'
})
export class EventserviceService {

  constructor(private http:HttpClient) { }

  getallevents() {
    return this.http.get<Event[]>('/assets/MockEvents.json');
  }
}
