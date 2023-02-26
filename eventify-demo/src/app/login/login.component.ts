import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: '',
  };

  // constructor(private http: HttpClient) {}

  // onSubmit() {
  //   this.http.get('/api/login', this.credentials).subscribe((response) => {
  //     console.log(response);
  //   });
  // }
}
