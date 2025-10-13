// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Observable } from 'rxjs';
// import { Firestore, doc, docData } from '@angular/fire/firestore';
// import { CommonModule } from '@angular/common';


// @Component({
//   selector: 'app-course-details',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './course-details.component.html',
//   styleUrl: './course-details.component.css'
// })
// export class CourseDetailsComponent  implements OnInit {
//   course$: Observable<any> | undefined;

//   constructor(private route: ActivatedRoute, private firestore: Firestore) {}

//   ngOnInit(): void {
//     const courseId = this.route.snapshot.paramMap.get('id');
//     if (courseId) {
//       const courseDoc = doc(this.firestore, `courses/${courseId}`);
//       this.course$ = docData(courseDoc);
//     } else {
//       console.error('No course ID found in route.');
//     }
//   }
// }


// import { Component, OnInit, inject } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Observable, switchMap } from 'rxjs';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { Course, CoursesService } from '../../services/courses.service';

// @Component({
//   selector: 'app-course-details',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   providers: [CoursesService], // ✅ Provide the service explicitly
//   templateUrl: './course-details.component.html',
//   styleUrls: ['./course-details.component.css']
// })
// export class CourseDetailsComponent implements OnInit {
//   course$: Observable<Course> | undefined;
//   private route = inject(ActivatedRoute);
//   private coursesService = inject(CoursesService);

//   ngOnInit(): void {
//     // ✅ Listen for changes in the route parameters & fetch updated course details
//     this.course$ = this.route.paramMap.pipe(
//       switchMap((params) => {
//         const courseId = params.get('id');
//         if (courseId) {
//           return this.coursesService.getCourseById(courseId);
//         } else {
//           console.error('No course ID found in route.');
//           return [];
//         }
//       })
//     );
//   }
// }


import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Course, CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [CoursesService],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  course$: Observable<Course> | undefined;
  private route = inject(ActivatedRoute);
  private coursesService = inject(CoursesService);

  ngOnInit(): void {
    this.course$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const courseId = params.get('id');
        if (courseId) {
          return this.coursesService.getCourseById(courseId);
        } else {
          console.error('No course ID found in route.');
          return [];
        }
      })
    );
  }
}
