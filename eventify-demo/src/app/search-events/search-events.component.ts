import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-events',
  templateUrl: './search-events.component.html',
  styleUrls: ['./search-events.component.css']
})
export class SearchEventsComponent implements OnInit {
  searchText: string = '';
  
  ngOnInit(): void {
    // this.getEvents();
    // this.getRecommendedEvents();
  }

  getEvents(): void {
    // this.eventService.getEvents()
    //   .subscribe(
    //     events => this.events = events,
    //     error => this.errorMessage = <any>error
    //   );
  }

  getRecommendedEvents(): void {
    // this.eventService.getRecommendedEvents()
    //   .subscribe(
    //     events => this.recommendedEvents = events,
    //     error => this.errorMessage = <any>error
    //   );
  }
}