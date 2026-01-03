import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { User } from '@angular/fire/auth';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { VideoComponent } from './components/video/video.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RegisterComponent,
    LoginComponent,
    RouterLink,
    RouterLinkActive,
    CoursesComponent,
    VideoComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-dream-app';
  currentRoute: string = '';
  isLoggedIn: boolean = false;
  userName: string = '';
  userEmail: string = '';
  enrolledCourses$: Observable<any[]> | null = null; // ✅ Enrolled courses list

  //Dynamic year
  currentYear: number = new Date().getFullYear();

  constructor(private router: Router, public authService: AuthService, private firestore: Firestore) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });

    // Subscribe to user state changes
    this.authService.currentUser$.subscribe((user: User | null) => {
      if (user) {
        this.isLoggedIn = true;
        this.userName = user.displayName || 'User';
        this.userEmail = user.email || '';

        // ✅ Load enrolled courses for this user
        this.loadEnrolledCourses(user.uid);
      } else {
        this.isLoggedIn = false;
        this.userName = '';
        this.userEmail = '';
        this.enrolledCourses$ = null; // Reset enrolled courses when logged out
      }
    });
  }

  logout() {
    this.authService.logout();
    this.enrolledCourses$ = null; // ✅ Clear enrolled courses on logout
    this.router.navigate(['/login']); // ✅ Redirect after logout
  }

  // ✅ Fetch enrolled courses from Firestore
  loadEnrolledCourses(userId: string) {
    const userCoursesRef = collection(this.firestore, `users/${userId}/enrolledCourses`);
    this.enrolledCourses$ = collectionData(userCoursesRef);
  }

  shouldShow(button: string): boolean {
    if (this.currentRoute.includes('/welcome')) {
      return this.isLoggedIn ? button === 'About' || button === 'Profile' : button === 'About' || button === 'Login';
    } else if (
      this.currentRoute.includes('/register') ||
      this.currentRoute.includes('/login')
    ) {
      return button === 'welcome';
    } else if (
      this.currentRoute.includes('/courses') ||
      this.currentRoute.includes('/course-details')
    ) {
      return this.isLoggedIn ? button === 'About' || button === 'Profile' : button === 'Login' || button === 'About';
    } else if (this.currentRoute.includes('/about') || this.currentRoute.includes('/interface')) {
      return this.isLoggedIn ? button === 'Courses' || button === 'Profile' : button === 'Login' || button === 'Courses';
    } else if (this.currentRoute.includes('/video') || this.currentRoute.includes('/assignment')) {
      return button === 'Courses' || button === 'Profile';
    }
    return false;
  }
}
