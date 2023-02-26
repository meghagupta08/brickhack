import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupService } from './signup.service';
import { User } from '../Models/User';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  userData = {
    email: '',
    password: '',
    degree_major_id: '',
    event_type_id: ''
  };

  submitted = false;

  onSubmit() {
    this.submitted = true;
    console.log(this.userData);
  }



  // constructor(private http: HttpClient) {}

  // onSubmit() {
  //   this.http.post('/api/signup', this.userData).subscribe((response) => {
  //     console.log(response);
  //   });
  // }
}
