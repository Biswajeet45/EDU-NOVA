import { Routes } from '@angular/router';
import { RegisterComponent } from '../register/register.component';



export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect empty path to home
    { path: '**', redirectTo: '/home', pathMatch: 'full' }, // Catch-all route
  ];
function linkClick() {
    throw new Error('Function not implemented.');
}

