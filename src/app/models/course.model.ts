// export interface Course {
//     id: number;
//     name: string;
//     description: string;
//     duration: string; // e.g., '4 weeks'
//     imageUrl: string; // URL for course image
//   }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from '../app.component';
import { CoursesComponent } from '../components/courses/courses.component'; // Import the component

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent, // Declare the component
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
