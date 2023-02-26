import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  }

  // constructor(private http: HttpClient) {}

  // onSubmit() {
  //   this.http.post('/api/signup', this.userData).subscribe((response) => {
  //     console.log(response);
  //   });
  // }
}
