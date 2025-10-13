
// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
// import { CommonModule } from '@angular/common';



// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule,CommonModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent {
//   email: string = '';
//   password: string = '';
//   loading: boolean = false; // Added loading state

//   constructor(private router: Router, private authService: AuthService) {}

//   // async login() {
//   //   this.loading = true;
//   //   try {
//   //     const user = await this.authService.login(this.email, this.password);
//   //     if (user) {
//   //       // alert('Login successful!');
//   //       this.router.navigate(['/courses']);
//   //     }
//   //   } catch (error: any) {
//   //     alert(error.message);
//   //   } finally {
//   //     this.loading = false; // Hide the message after response
//   //   }


//   //updated 
//   async login() {
//     this.loading = true;
//     try {
//       const user = await this.authService.login(this.email, this.password);
//       await this.authService.isEmailRegistered(this.email);
      
//       if (user) {
//         alert('Login successful!');
        
//         this.router.navigate(['/courses']);
//       }
//     }
    
//      catch (error: any) {
//       if (error.message == 'Firebase: Error (auth/invalid-credential).') {
        
//         alert('Give correct EmailID and Password');
       
//       } else if (error.message == 'Firebase: Error (auth/missing-password).') {
//         alert('Password is Missing');
//       } else if (error.message == 'Firebase: Error (auth/invalid-email).') {
//         alert(' Email Id is Missing');
//       } else {
//         alert('Login failed: ' + error.message);
//       }
//      }
//      finally {
//       this.loading = false;
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
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loading: boolean = false;
  showPassword: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  async login() {
    this.loading = true;

    // ✅ Show loading animation while logging in
    Swal.fire({
      title: 'Logging in...',
      text: 'Please wait while we authenticate your credentials.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const user = await this.authService.login(this.email, this.password);
      await this.authService.isEmailRegistered(this.email);

      if (user) {
        // ✅ Success message & redirect
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Redirecting to courses...',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });

        setTimeout(() => {
          this.router.navigate(['/courses']);
        }, 2000);
      }
    } catch (error: any) {
      let errorMessage = 'Login failed. Please try again.';

      if (error.message === 'Firebase: Error (auth/invalid-credential).') {
        errorMessage = 'Incorrect Email ID or Password. Please try again.';
      } else if (error.message === 'Firebase: Error (auth/missing-password).') {
        errorMessage = 'Password is missing.';
      } else if (error.message === 'Firebase: Error (auth/invalid-email).') {
        errorMessage = 'Email ID is missing or invalid.';
      }

      // ✅ Show styled error message
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: errorMessage,
        confirmButtonColor: '#d33',
      });
    } finally {
      this.loading = false;
    }
  }

  async forgotPassword() {
    if (!this.email) {
      Swal.fire({
        icon: 'warning',
        title: 'Enter Email',
        text: 'Please enter your email to reset your password.',
      });
      return;
    }
  
    try {
      await this.authService.forgotPassword(this.email);
      Swal.fire({
        icon: 'success',
        title: 'Reset Email Sent!',
        text: 'Please check your inbox for the password reset link.',
        confirmButtonColor: '#3085d6',
      });
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Reset Failed',
        text: error.message,
      });
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
