import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-createupdateevent',
  templateUrl: './createupdateevent.component.html',
  styleUrls: ['./createupdateevent.component.css']
})
export class CreateupdateeventComponent {

  isNew: boolean = true;
  eventData = {
    title: '',
    description: '',
    startdate: '',
    enddate: '',
    starttime: '',
    endtime: '',
    location: '',
    eventType: ''
  };

  ngOnInit(): void {
    // this.route.params.subscribe(params => {
    //   const eventId = params['id'];
    //   if (eventId) {
    //     this.isNew = false;
    //     this.eventService.getEvent(eventId).subscribe(event => {
    //       this.event = event;
    //     });
    //   } else {
    //     this.isNew = true;
    //   }
    // });
  }

  onSubmit(): void {
    // if (this.isNew) {
    //   this.eventService.createEvent(this.event).subscribe(event => {
    //     console.log(`Created event with ID: ${event.id}`);
    //   });
    // } else {
    //   this.eventService.updateEvent(this.event).subscribe(event => {
    //     console.log(`Updated event with ID: ${event.id}`);
    //   });
    // }
  }

}
