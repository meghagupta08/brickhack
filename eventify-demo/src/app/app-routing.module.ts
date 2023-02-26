import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { SearchEventsComponent } from './search-events/search-events.component';
import { CreateupdateeventComponent } from './createupdateevent/createupdateevent.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'searchevents', component: SearchEventsComponent },
  { path: 'createupdateevent', component: CreateupdateeventComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
