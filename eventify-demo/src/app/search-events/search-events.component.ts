import { Component, OnInit } from '@angular/core';
import { Event } from '../Models/Event';
import { Observable } from 'rxjs';
import {  EventserviceService } from '../service/eventservice.service';

@Component({
  selector: 'app-search-events',
  templateUrl: './search-events.component.html',
  styleUrls: ['./search-events.component.css']
})
export class SearchEventsComponent implements OnInit {
  searchText: string = '';
  //event: Event;
  events!: Observable<Event[]>;


  constructor(private eventServices: EventserviceService
  ) {
    // this.event = {
    //   eventID: 6,
    //   eventName: "Hackathon",
    //   eventDesc: "Discover new ideas and strategies for success",
    //   event_type_id: 3,
    //   location_type_id: 2,
    //   startdate: new Date("2023-02-27 13:04:27"),
    //   enddate: new Date("2023-02-27 17:04:27"),
    //   eventduration: 4,
    //   eventCapacity: 96,
    //   major_type_id: 5,
    //   event_type:"Games"
    // } as Event;


  }
  

  // functionality: 1. On search an event, we call getAllEvents and use a simple search to search the events list
  // 2. On init there should be an api call for getEvents()
  // 3. getRecommendedEvents should hit a get API and should send an event 
  
  ngOnInit(): void {
     this.getEvents();
    // this.getRecommendedEvents();
  }

  getEvents(): void {
    // this.eventService.getEvents()
    //   .subscribe(
    //     events => this.events = events,
    //     error => this.errorMessage = <any>error
    //   );

    this.events =  this.eventServices.getallevents();

  }

  getRecommendedEvents(): void {
    // this.eventService.getRecommendedEvents()
    //   .subscribe(
    //     events => this.recommendedEvents = events,
    //     error => this.errorMessage = <any>error
    //   );
  }
}