
// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
// import { AuthService } from '../../services/auth.service'; // Import AuthService
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [RouterOutlet,CommonModule, RouterLink, RouterLinkActive, FormsModule],
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css'],
// })
// export class RegisterComponent {
//   name: string = '';
//   email: string = '';
//   password: string = '';
//   reenterPassword: string = '';
//   isRegistering: boolean = false; // New state for showing the message

//   constructor(private router: Router, private authService: AuthService) {}

//   isValidPassword(password: string): boolean {
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
//     return passwordRegex.test(password);
//   }

//   async register() {
//     if (!this.name || !this.email || !this.password || !this.reenterPassword) {
//       alert('Please fill in all fields.');
//       return;
//     }

//     if (!this.isValidPassword(this.password)) {
//       alert(
//         'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one digit, and one special character.'
//       );
//       return;
//     }

//     if (this.password !== this.reenterPassword) {
//       alert('Passwords do not match. Please re-enter your password.');
//       return;
//     }

//     this.isRegistering = true; // Show "Registering..." message

//     try {
//       await this.authService.register(this.email, this.password, this.name);
//       alert('Registration successful! Redirecting to login...');
//       setTimeout(() => {
//         this.router.navigate(['/login']);
//       }, 2000);
//     } catch (error: any) {
//       alert(error.message);
//     } finally {
//       this.isRegistering = false; // Hide "Registering..." message after process
//     }
//   }
// }





// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
// import { CommonModule } from '@angular/common';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive, FormsModule],
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css'],
// })
// export class RegisterComponent {
//   name: string = '';
//   email: string = '';
//   password: string = '';
//   reenterPassword: string = '';
//   isRegistering: boolean = false;

//   constructor(private router: Router, private authService: AuthService) {}

//   isValidPassword(password: string): boolean {
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
//     return passwordRegex.test(password);
//   }

//   async register() {
//     if (!this.name || !this.email || !this.password || !this.reenterPassword) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Incomplete Fields',
//         text: 'Please fill in all fields before continuing.',
//         confirmButtonColor: '#3085d6',
//       });
//       return;
//     }

//     if (!this.isValidPassword(this.password)) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Weak Password',
//         text: 'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one digit, and one special character.',
//         confirmButtonColor: '#d33',
//       });
//       return;
//     }

//     if (this.password !== this.reenterPassword) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Password Mismatch',
//         text: 'Passwords do not match. Please re-enter your password.',
//         confirmButtonColor: '#d33',
//       });
//       return;
//     }

//     this.isRegistering = true;

//     try {
//       // ✅ Show loading animation
//       Swal.fire({
//         title: 'Registering...',
//         text: 'Please wait while we create your account.',
//         allowOutsideClick: false,
//         didOpen: () => {
//           Swal.showLoading();
//         },
//       });

//       await this.authService.register(this.email, this.password, this.name);

//       // ✅ Success message & redirect
//       Swal.fire({
//         icon: 'success',
//         title: 'Registration Successful!',
//         text: 'Redirecting to login...',
//         timer: 2000,
//         timerProgressBar: true,
//         showConfirmButton: false,
//       });

//       setTimeout(() => {
//         this.router.navigate(['/login']);
//       }, 2000);
//     } catch (error: any) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Registration Failed',
//         text: error.message,
//         confirmButtonColor: '#d33',
//       });
//     } finally {
//       this.isRegistering = false;
//     }
//   }
// }


 
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  reenterPassword: string = '';
  isRegistering: boolean = false;
  showPassword: boolean = false;
  showReenterPassword: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
    return passwordRegex.test(password);
  }
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  

  async register() {
    if (!this.name || !this.email || !this.password || !this.reenterPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Fields',
        text: 'Please fill in all fields before continuing.',
      });
      return;
    }

    if (!this.isValidEmail(this.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email Format',
        text: 'Please enter a valid email address.',
      });
      return;
    }
  
    if (!this.isValidPassword(this.password)) {
      Swal.fire({
        icon: 'error',
        title: 'Weak Password',
        text: 'Password must be at least 8 characters long, with uppercase, lowercase, a number, and a special character.',
      });
      return;
    }
  
    if (this.password !== this.reenterPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'Passwords do not match. Please re-enter your password.',
      });
      return;
    }
  
    this.isRegistering = true;
  
    try {
      Swal.fire({
        title: 'Registering...',
        text: 'Please wait while we create your account.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
  
      await this.authService.register(this.email, this.password, this.name);
  
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'A verification email has been sent. Please check your inbox before logging in.',
        confirmButtonColor: '#3085d6',
      });
  
      // ✅ Redirect to login page but user still can't log in until verification
      this.router.navigate(['/login']);
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.message, // Shows "User already exists" if email is taken
      });
    } finally {
      this.isRegistering = false;
    }
  }
  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'reenterPassword') {
      this.showReenterPassword = !this.showReenterPassword;
    }
  }
  
  
}
