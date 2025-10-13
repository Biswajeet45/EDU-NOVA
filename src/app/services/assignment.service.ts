import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, docData, setDoc, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  private firestore = inject(Firestore);

  // ✅ Fetch assignments for a course
  getAssignments(courseId: string): Observable<any[]> {
    const assignmentsRef = collection(this.firestore, `courses/${courseId}/assignments`);
    return new Observable((observer) => {
      getDocs(assignmentsRef).then((snapshot) => {
        const assignments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        observer.next(assignments);
      });
    });
  }

  // ✅ Submit assignment
  submitAssignment(courseId: string, materialsId: string, userId: string, submission: any): Promise<void> {
    const submissionRef = doc(this.firestore, `courses/${courseId}/materials/${materialsId}/assignments/${userId}`);
    return setDoc(submissionRef, submission);
  }

  // ✅ Fetch user submission
  getUserSubmission(courseId: string, materialsId: string, userId: string): Observable<any> {
    const submissionRef = doc(this.firestore, `courses/${courseId}/materials/${materialsId}/assignments/${userId}`);
    return docData(submissionRef);
  }
}
