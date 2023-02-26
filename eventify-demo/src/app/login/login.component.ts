import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Event } from '../Models/Event';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //eventList: Event[];
  event: Event;


  credentials = {
    email: '',
    password: '',
  };


  constructor(private http: HttpClient,
    public loginService: LoginService,
  ) {
    this.event = {
      eventID: 6,
      eventName: "Hackathon",
      eventDesc: "Discover new ideas and strategies for success",
      event_type_id: 3,
      location_type_id: 2,
      startdate: new Date("2023-02-27 13:04:27"),
      enddate: new Date("2023-02-27 17:04:27"),
      eventduration: 4,
      eventCapacity: 96,
      major_type_id: 5,
      event_type:"Games"
    } as Event;


   }

 

  ngOnInit(): void {
    this.loginService.getRecommendedEvents(this.event).subscribe((response) => {
      debugger;
      //this.userInfo = response;
      //return;
      console.log(response);
      // this.userInfo.page = response?.page;
      // this.userInfo.per_page = response?.per_page;
      // //this.userInfo.support = response.support;
      // this.userInfo.total = response?.total;
      // this.userInfo.total_pages = response?.total_pages;
      // this.userInfo.data = response?.data?.map((item) => {
      //   var user = {} as User;
      //   user.avatar = item?.avatar;
      //   user.email = item?.email;
      //   user.first_name = item?.first_name;
      //   user.last_name = item?.last_name;
      //   user.id = item?.id;
      //   return user;
      return response;
    });
  }
  }
