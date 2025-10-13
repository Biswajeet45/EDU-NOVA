import { Routes } from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { CoursesComponent } from './components/courses/courses.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { VideoComponent } from './components/video/video.component';
import { AssignmentComponent } from './components/assignment/assignment.component';
import { InterfaceComponent } from './components/interface/interface.component';


export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'about', component: AboutComponent },
    { path: 'courses', component: CoursesComponent },
    {path: 'welcome' , component :WelcomeComponent},
    { path: 'course-details/:id', component: CourseDetailsComponent },
    // {path: 'interface',component:InterfaceComponent},
    { path: 'interface/:id', component: InterfaceComponent },
    { path: 'video/:courseId/:materialId/:courseName/:materialTitle', component: VideoComponent },
    { path: 'assignment/:courseId/:materialId/:materialTitle', component: AssignmentComponent },
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    { path: '**', redirectTo: '/welcome', pathMatch: 'full' } 
  ];
function linkClick() {
    throw new Error('Function not implemented.');
}
