import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeService } from './home.service';
import { Event } from '../Models/Event';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //eventList: Event[];

  eventList:Event[];

  credentials = {
    email: 'ms6674@rit.edu',
    password: '',
  };


  constructor(private http: HttpClient,
    public homeService: HomeService,
  ) {
    this.eventList = [];

   }

 

  ngOnInit(): void {
    this.homeService.getUserEvents(this.credentials.email).subscribe((response) => {
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
      this.eventList = response;
      return response;
    });
  }
  }