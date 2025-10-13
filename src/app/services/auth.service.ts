// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private currentUser: string | null = null;

//   constructor() {
//     this.currentUser = localStorage.getItem('currentUser');
//   }


//   login(email: string, password: string, name: string): void {
//     const user = { email: email, password: password, name: name };
//     localStorage.setItem('currentUser', JSON.stringify(user)); 
//     this.currentUser = email;
    
//     console.log('Logged in with:', email);
//   }
  


//   getCurrentUser(): string | null {
//     if (!this.currentUser) {
//       this.currentUser = localStorage.getItem('currentUser');
//       if (this.currentUser) {
//         const userData = JSON.parse(this.currentUser);
//         this.currentUser = userData.email;
//       }
//     }
//     return this.currentUser;
//   }

//   logout(): void {
//     this.currentUser = null; 
//     localStorage.removeItem('currentUser')
//   }

//   isLoggedIn(): boolean {
//     return this.currentUser !== null;
//   }
// }




import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  User,
  onAuthStateChanged,
  fetchSignInMethodsForEmail,
  sendEmailVerification,
  applyActionCode,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private auth: Auth, private router: Router) {
    // ✅ Listen for authentication state changes
    onAuthStateChanged(this.auth, async (user) => {
      console.log('Auth state changed:', user);
    
      this.currentUserSubject.next(user);
    });
  }

  // ✅ Register Method with Email Existence Check
  async register(email: string, password: string, name: string): Promise<void> {
    try {
      // ✅ Check if the email is already registered
      const isRegistered = await this.isEmailRegistered(email);
      if (isRegistered) {
        throw new Error('User already exists. Please log in instead.');
      }
  
      // ✅ Create user account
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
  
      // ✅ Send email verification
      await this.sendEmailVerification();
  
      // ✅ Force logout so user can't use the app until verification is done
      await signOut(this.auth);
      this.currentUserSubject.next(null);
  
      console.log('✅ Registration successful! Verification email sent.');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('User already exists. Please log in instead.');
      }
      throw new Error(error.message);
    }
  }
  
  

  // ✅ Check if Email is Registered
  async isEmailRegistered(email: string): Promise<boolean> {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(this.auth, email);
      return signInMethods.length > 0; // ✅ Returns true if email exists
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  }
  

  // ✅ Send Email Verification
  async sendEmailVerification(): Promise<void> {
    if (this.auth.currentUser) {
      await sendEmailVerification(this.auth.currentUser);
      console.log('Verification email sent');
    }
  }

  // ✅ Login Method (Prevents login if not verified)
  async login(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);

      if (!userCredential.user.emailVerified) {
        await signOut(this.auth); // Prevent login
        throw new Error('Please verify your email before logging in.');
      }

      this.currentUserSubject.next(userCredential.user);
      return userCredential.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // ✅ Get Current User
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // ✅ Logout Method
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.currentUserSubject.next(null);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.currentUser$.pipe(map(user => !!user));
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      console.log('✅ Password reset email sent.');
    } catch (error: any) {
      console.error('❌ Forgot password error:', error.message);
      throw new Error('Failed to send reset email. Check your email and try again.');
    }
  }

}
