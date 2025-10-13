import { Routes } from '@angular/router';
import { CourseDetailsComponent } from './course-details.component';


export const routes: Routes = [
  { path: 'course-details/:id', component: CourseDetailsComponent },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
];
