import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';




export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect empty path to home
    { path: '**', redirectTo: '/home', pathMatch: 'full' }, // Catch-all route
  ];
function linkClick() {
    throw new Error('Function not implemented.');
}

