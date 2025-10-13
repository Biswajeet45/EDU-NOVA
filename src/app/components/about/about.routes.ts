import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AboutComponent } from './about.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
];
