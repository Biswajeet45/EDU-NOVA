// import { Injectable } from '@angular/core';
// import { Firestore, collection, collectionData, addDoc, deleteDoc, doc, docData } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';

// export interface Course {
//   id?: string;
//   name: string;
//   description: string;
//   duration: string;
//   imageUrl: string;
//   materials?: string[]; 
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class CoursesService {
//   private coursesCollection = 'courses'; // Firestore collection name

//   constructor(private firestore: Firestore) {}

//   // Get all courses from Firestore
//   getCourses(): Observable<Course[]> {
//     const coursesRef = collection(this.firestore, this.coursesCollection);
//     return collectionData(coursesRef, { idField: 'id' }) as Observable<Course[]>;
//   }

//   getCourseById(id: string): Observable<Course> {
//         const courseDocRef = doc(this.firestore, `${this.coursesCollection}/${id}`);
//         return docData(courseDocRef, { idField: 'id' }) as Observable<Course>;
//       }

// }




import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Material {
  id: string;
  title: string;
  completed: boolean;
  videos: string[];
}

export interface Course {
  id?: string;
  name: string;
  description: string;
  duration: string;
  imageUrl: string;
  materials?: Material[];
}

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private coursesCollection = 'courses'; 

  constructor(private firestore: Firestore) {}

  getCourses(): Observable<Course[]> {
    const coursesRef = collection(this.firestore, this.coursesCollection);
    return collectionData(coursesRef, { idField: 'id' }) as Observable<Course[]>;
  }

  getCourseById(id: string): Observable<Course> {
    const courseDocRef = doc(this.firestore, `${this.coursesCollection}/${id}`);
    return docData(courseDocRef, { idField: 'id' }) as Observable<Course>;
  }
  
}






