
// import { Component, OnInit, inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { Auth } from '@angular/fire/auth';
// import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
// import { Course, CoursesService } from '../../services/courses.service';
// import Swal from 'sweetalert2';


// @Component({
//   selector: 'app-courses',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './courses.component.html',
//   styleUrls: ['./courses.component.css'],
// })
// export class CoursesComponent implements OnInit {
//   courses: Course[] = [];
//   enrolledCourses: Set<string> = new Set(); // ✅ Track enrolled courses locally
//   private auth = inject(Auth);
//   private firestore = inject(Firestore);

//   constructor(
//     private router: Router,
//     private coursesService: CoursesService
//   ) {}

//   ngOnInit(): void {
//     this.getCourses();
//   }

//   getCourses(): void {
//     this.coursesService.getCourses().subscribe((data) => {
//       this.courses = data;
//       this.loadUserEnrollments(); // ✅ Check enrollments after courses load
//     });
//   }

//   loadUserEnrollments(): void {
//     const user = this.auth.currentUser;
//     if (user) {
//       this.courses.forEach(course => {
//         const enrollmentRef = doc(this.firestore, `courses/${course.id}/users/${user.uid}`);
//         docData(enrollmentRef).subscribe((enrollment) => {
//           if (enrollment?.['enrolled']) {
//             this.enrolledCourses.add(course.id!);
//           }
//         });
//       });
//     }
//   }

//   handleEnrollment(course: Course): void {
//     if (this.enrolledCourses.has(course.id!)) {
//       // ✅ If already enrolled, go to course details
//       this.router.navigate(['/course-details', course.id]);
//     } else {
//       // ✅ Otherwise, enroll the user
//       this.enroll(course);
//     }
//   }
  
//   // enroll(course: Course): void {
//   //   const user = this.auth.currentUser;
//   //   if (!user) {
//   //     alert(`Please log in to enroll in "${course.name}"`);
//   //     return;
//   //   }

//   //   const enrollmentRef = doc(this.firestore, `courses/${course.id}/users/${user.uid}`);

//   //   setDoc(enrollmentRef, { enrolled: true }).then(() => {
//   //     console.log(`User ${user.uid} enrolled in ${course.name}`);
      
//   //     this.enrolledCourses.add(course.id!); // ✅ Update UI immediately
//   //     this.router.navigate(['/course-details', course.id]); // ✅ Redirect to course-details
//   //   }).catch((error) => {
//   //     console.error("Error enrolling:", error);
//   //   });
//   // }



//   // enroll(course: Course): void {
//   //   const user = this.auth.currentUser;
//   //   if (!user) {
//   //     alert(`Please log in to enroll in "${course.name}"`);
//   //     return;
//   //   }
  
//   //   // ✅ Show confirmation alert using window.confirm() (You can replace this with a better styled alert)
//   //   const confirmEnrollment = confirm(`Are you sure you want to enroll in "${course.name}"?`);
//   //   if (!confirmEnrollment) {
//   //     return; // 🚫 Stop if user cancels
//   //   }
  
//   //   const enrollmentRef = doc(this.firestore, `courses/${course.id}/users/${user.uid}`);
  
//   //   setDoc(enrollmentRef, { enrolled: true }).then(() => {
//   //     console.log(`User ${user.uid} enrolled in ${course.name}`);
      
//   //     this.enrolledCourses.add(course.id!); // ✅ Update UI immediately
//   //     this.router.navigate(['/course-details', course.id]); // ✅ Redirect to course-details
//   //   }).catch((error) => {
//   //     console.error("Error enrolling:", error);
//   //   });
//   // }
  


  
//   enroll(course: Course): void {
//     const user = this.auth.currentUser;
    
//     // ✅ If user is NOT logged in, show a styled login alert
//     if (!user) {
//       Swal.fire({
//         title: 'Login Required',
//         text: 'You must log in to enroll in this course.',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonText: 'Go to Login',
//         cancelButtonText: 'Cancel',
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33'
//       }).then((result) => {
//         if (result.isConfirmed) {
//           this.router.navigate(['/login']); // ✅ Redirect to login page
//         }
//       });
//       return;
//     }
  
//     // ✅ Show enrollment confirmation alert
//     Swal.fire({
//       title: 'Confirm Enrollment',
//       text: `Are you sure you want to enroll in "${course.name}"?`,
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, Enroll!',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         const enrollmentRef = doc(this.firestore, `courses/${course.id}/users/${user.uid}`);
  
//         setDoc(enrollmentRef, { enrolled: true }).then(() => {
//           console.log(`User ${user.uid} enrolled in ${course.name}`);
  
//           this.enrolledCourses.add(course.id!); // ✅ Update UI immediately
//           this.router.navigate(['/course-details', course.id]); // ✅ Redirect to course-details
//         }).catch((error) => {
//           console.error("Error enrolling:", error);
//         });
//       }
//     });
//   }
// }
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { Course, CoursesService } from '../../services/courses.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  enrolledCourses: Set<string> = new Set();
  isLoading: boolean = true; // ✅ New loading state
  showNoCoursesMessage: boolean = false; // ✅ Delay showing "No Courses Available"

  private auth = inject(Auth);
  private firestore = inject(Firestore);

  constructor(
    private router: Router,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.isLoading = true; // ✅ Show loading animation before fetching data

    this.coursesService.getCourses().subscribe((data) => {
      this.courses = data;
      this.loadUserEnrollments();
      this.isLoading = false; // ✅ Hide loading animation after fetching data

      // ✅ Delay the "No Courses Available" message by 2 seconds if courses are empty
      if (this.courses.length === 0) {
        setTimeout(() => {
          this.showNoCoursesMessage = true;
        }, 2000);
      }
    }, () => {
      this.isLoading = false; // ✅ Hide loading even if there's an error
    });
  }

  loadUserEnrollments(): void {
    const user = this.auth.currentUser;
    if (user) {
      this.courses.forEach(course => {
        const enrollmentRef = doc(this.firestore, `courses/${course.id}/users/${user.uid}`);
        docData(enrollmentRef).subscribe((enrollment) => {
          if (enrollment?.['enrolled']) {
            this.enrolledCourses.add(course.id!);
          }
        });
      });
    }
  }

  handleEnrollment(course: Course): void {
    if (this.enrolledCourses.has(course.id!)) {
      this.router.navigate(['/course-details', course.id]);
    } else {
      this.enroll(course);
    }
  }

  enroll(course: Course): void {
    const user = this.auth.currentUser;
  
  if (!user) {
    Swal.fire({
      title: 'Login Required',
      text: 'You must log in to enroll in this course.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Go to Login',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/login']);
      }
    });
    return;
  }

  Swal.fire({
    title: 'Confirm Enrollment',
    text: `Are you sure you want to enroll in "${course.name}"?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Enroll!',
  }).then((result) => {
    if (result.isConfirmed) {
      const userEnrollmentRef = doc(this.firestore, `users/${user.uid}/enrolledCourses/${course.id}`);
      const courseEnrollmentRef = doc(this.firestore, `courses/${course.id}/users/${user.uid}`);

      // ✅ Store enrollment in both `users` & `courses` collections
      Promise.all([
        setDoc(userEnrollmentRef, { id: course.id, name: course.name, enrolled: true }),
        setDoc(courseEnrollmentRef, { enrolled: true })
      ]).then(() => {
        console.log(`User ${user.uid} enrolled in ${course.name}`);
        this.router.navigate(['/course-details', course.id]);
      }).catch((error) => {
        console.error("Error enrolling:", error);
      });
    }
  });
}
}
