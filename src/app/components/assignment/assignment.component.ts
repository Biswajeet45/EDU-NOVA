// import { Component, OnInit, inject } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Auth, user } from '@angular/fire/auth';
// import { StudyMaterialService } from '../../services/study-material.service';

// @Component({
//   selector: 'app-assignment',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './assignment.component.html',
//   styleUrls: ['./assignment.component.css'],
// })
// export class AssignmentComponent implements OnInit {
//   courseId: string | null = null;
//   materialId: string | null = null;
//   materialTitle: string = '';
//   assignmentAnswer: string = '';
//   assignmentSubmitted: boolean = false;
//   studyMaterials: any[] = [];

//   private route = inject(ActivatedRoute);
//   private firestore = inject(Firestore);
//   private router = inject(Router);
//   private auth = inject(Auth);
//   private studyMaterialService = inject(StudyMaterialService);

//   ngOnInit(): void {
//     this.courseId = this.route.snapshot.paramMap.get('courseId');
//     this.materialId = this.route.snapshot.paramMap.get('materialId');
//     this.materialTitle = decodeURIComponent(this.route.snapshot.paramMap.get('materialTitle') || '');

//     const state = history.state;
//     if (state && state.studyMaterials) {
//       this.studyMaterials = state.studyMaterials;
//     }
//   }


//   submitAssignment(): void {
//     if (!this.courseId || !this.materialId) return;
  
//     user(this.auth).subscribe((authUser) => {
//       if (!authUser) {
//         console.error('No user logged in.');
//         return;
//       }
  
//       const userId = authUser.uid;
//       const userProgressRef = doc(this.firestore, `courses/${this.courseId}/users/${userId}`);
  
//       updateDoc(userProgressRef, { [`${this.materialId}_assignment_completed`]: true })
//         .then(() => {
//           console.log(`Assignment ${this.materialId} marked as completed for user ${userId}.`);
//           this.assignmentSubmitted = true;
  
//           // ✅ Unlock next study material using the service
//           this.studyMaterialService.unlockNextStudyMaterial(this.courseId!, userId, this.materialId!);
  
//           // ✅ Redirect back to interface and trigger progress update
//           setTimeout(() => {
//             this.router.navigate([`/interface/${this.courseId}`], { state: { refresh: true } });
//           }, 2000);
//         })
//         .catch((error) => {
//           console.error('Error submitting assignment:', error);
//         });
//     });
//   }
  
  
// }


// import { Component, OnInit, inject } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
// import { FormsModule } from '@angular/forms';

// interface MCQ {
//   question: string;
//   options: string[];
//   correctAnswer: string;
//   selectedAnswer?: string; // ✅ Store user-selected answer
// }

// @Component({
//   selector: 'app-assignment',
//   standalone: true,
//   imports: [CommonModule,FormsModule],
//   templateUrl: './assignment.component.html',
//   styleUrls: ['./assignment.component.css']
// })
// export class AssignmentComponent implements OnInit {
//   courseId: string | null = null;
//   materialId: string | null = null;
//   materialTitle: string | null = null;
//   mcqList: MCQ[] = [];
//   isLoading: boolean = true; // ✅ Show loading state

//   private route = inject(ActivatedRoute);
//   private firestore = inject(Firestore);
//   private router = inject(Router);

//   async ngOnInit(): Promise<void> {
//     this.courseId = this.route.snapshot.paramMap.get('courseId');
//     this.materialId = this.route.snapshot.paramMap.get('materialId');
//     this.materialTitle = this.materialTitle ? decodeURIComponent(this.materialTitle) : null;

//     if (this.courseId && this.materialId) {
//       await this.fetchMCQs(this.courseId, this.materialId);
//     } else {
//       console.warn("Invalid course ID or material ID");
//     }
//   }

//   /** ✅ Fetch MCQs from Firestore */
//   async fetchMCQs(courseId: string, materialId: string): Promise<void> {
//     try {
//       const courseDocRef = doc(this.firestore, `courses/${courseId}`);
//       const courseSnapshot = await getDoc(courseDocRef);

//       if (courseSnapshot.exists()) {
//         const courseData = courseSnapshot.data();

//         if (courseData?.['materials']) {
//           const materialsArray = courseData['materials'];

//           if (Array.isArray(materialsArray)) {
//             const material = materialsArray.find((m: any) => m.id === materialId);

//             if (material) {
//               this.mcqList = material.mcqs || []; // ✅ Store MCQs
//             } else {
//               console.warn("Material not found in Firestore.");
//             }
//           } else {
//             console.warn("Materials field is not an array.");
//           }
//         } else {
//           console.warn("No materials found in Firestore document.");
//         }
//       } else {
//         console.warn("Course not found in Firestore.");
//       }
//     } catch (error) {
//       console.error("Error fetching MCQs:", error);
//     } finally {
//       this.isLoading = false; // ✅ Stop Loading Once Data is Fetched
//     }
//   }

//   /** ✅ Submit Assignment */
//   submitAssignment(): void {
//     if (!this.courseId || !this.materialId) return;

//     const totalQuestions = this.mcqList.length;
//     const correctAnswers = this.mcqList.filter(q => q.selectedAnswer === q.correctAnswer).length;
//     const score = Math.round((correctAnswers / totalQuestions) * 100);

//     alert(`✅ Assignment Completed!\nScore: ${score}%\n(${correctAnswers}/${totalQuestions} correct)`);

//     this.markAssignmentAsCompleted();
//   }

//   /** ✅ Mark Assignment as Completed and Unlock Next Material */
//   async markAssignmentAsCompleted() {
//     try {
//       const userId = "testUser123"; // ✅ Replace with actual logged-in user ID
//       const userProgressRef = doc(this.firestore, `courses/${this.courseId}/users/${userId}`);

//       await updateDoc(userProgressRef, { [`${this.materialId}_assignment_completed`]: true });

//       console.log(`Assignment ${this.materialId} marked as completed for user ${userId}.`);

//       // ✅ Unlock the next study material
//       this.unlockNextStudyMaterial(userId);

//       // ✅ Redirect back to interface and trigger progress update
//       setTimeout(() => {
//         this.router.navigate([`/interface/${this.courseId}`], { state: { refresh: true } });
//       }, 2000);
//     } catch (error) {
//       console.error("Error marking assignment as completed:", error);
//     }
//   }

//   /** ✅ Unlock the next study material */
//   async unlockNextStudyMaterial(userId: string) {
//     if (!this.courseId) return;

//     const courseDocRef = doc(this.firestore, `courses/${this.courseId}`);
//     const courseSnapshot = await getDoc(courseDocRef);

//     if (courseSnapshot.exists()) {
//       const courseData = courseSnapshot.data();
//       const materialsArray = courseData?.['materials'];

//       if (Array.isArray(materialsArray)) {
//         const currentIndex = materialsArray.findIndex((m: any) => m.id === this.materialId);

//         if (currentIndex !== -1 && currentIndex + 1 < materialsArray.length) {
//           const nextMaterialId = materialsArray[currentIndex + 1].id;
//           const userProgressRef = doc(this.firestore, `courses/${this.courseId}/users/${userId}`);

//           await updateDoc(userProgressRef, { [`${nextMaterialId}_unlocked`]: true });
//           console.log(`Next study material ${nextMaterialId} unlocked for user ${userId}.`);
//         }
//       }
//     }
//   }
// }

import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth, user } from '@angular/fire/auth';
import { StudyMaterialService } from '../../services/study-material.service';

@Component({
  selector: 'app-assignment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css'],
})
export class AssignmentComponent implements OnInit {
  courseId: string | null = null;
  materialId: string | null = null;
  materialTitle: string = '';
  assignmentSubmitted: boolean = false;
  mcqList: any[] = [];
  userScore: number | null = null;
  userAnswers: { [question: string]: string } = {}; // ✅ Store user answers

  private route = inject(ActivatedRoute);
  private firestore = inject(Firestore);
  private router = inject(Router);
  private auth = inject(Auth);
  private studyMaterialService = inject(StudyMaterialService);

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.materialId = this.route.snapshot.paramMap.get('materialId');
    this.materialTitle = decodeURIComponent(this.route.snapshot.paramMap.get('materialTitle') || '');

    this.fetchMCQs();
  }

  /** ✅ Fetch MCQs and User Answers from Firestore */
  async fetchMCQs() {
    if (!this.courseId || !this.materialId) return;

    const courseDocRef = doc(this.firestore, `courses/${this.courseId}`);
    const courseSnapshot = await getDoc(courseDocRef);

    if (courseSnapshot.exists()) {
      const courseData = courseSnapshot.data();

      // ✅ Fix: Use bracket notation for 'materials'
      if (courseData && courseData['materials']) {
        const materialsArray = courseData['materials']; // ✅ Extract materials array

        if (Array.isArray(materialsArray)) {
          const material = materialsArray.find((m: any) => m.id === this.materialId);

          if (material) {
            this.mcqList = material['mcqs'] || []; // ✅ Fix: Use ['mcqs'] instead of .mcqs
            this.fetchUserProgress(); // ✅ Fetch previous answers if available
          }
        }
      }
    }
  }

  /** ✅ Fetch User Progress (Answers & Score) */
  async fetchUserProgress() {
    user(this.auth).subscribe(async (authUser) => {
      if (!authUser || !this.courseId || !this.materialId) return;
  
      const userId = authUser.uid;
      const progressDocRef = doc(this.firestore, `courses/${this.courseId}/users/${userId}/assignments/${this.materialId}`);
      const progressSnapshot = await getDoc(progressDocRef);
  
      if (progressSnapshot.exists()) {
        const progressData = progressSnapshot.data();
  
        // ✅ Ensure `score` is properly assigned
        this.userScore = progressData['score'] !== undefined ? progressData['score'] : null;
        this.userAnswers = progressData['answers'] || {};
  
        // ✅ Apply previous answers to MCQs
        this.mcqList.forEach(mcq => {
          if (this.userAnswers[mcq.question]) {
            mcq.selectedAnswer = this.userAnswers[mcq.question]; // ✅ Restore answer
          }
        });
  
        console.log("User's previous answers loaded:", this.userAnswers);
        console.log("User's score loaded:", this.userScore); // ✅ Check if score is fetched
      }
    });
  }
  

  /** ✅ Submit Assignment and Save Answers */
submitAssignment(): void {
  if (!this.courseId || !this.materialId) return;

  user(this.auth).subscribe(async (authUser) => {
    if (!authUser) {
      console.error('No user logged in.');
      return;
    }

    const userId = authUser.uid;
    const userProgressRef = doc(this.firestore, `courses/${this.courseId}/users/${userId}/assignments/${this.materialId}`);

    // ✅ Calculate Score
    let score = 0;
    this.mcqList.forEach(mcq => {
      if (mcq.selectedAnswer === mcq['correctAnswer']) { 
        score++;
      }
      this.userAnswers[mcq['question']] = mcq.selectedAnswer;
    });

    // ✅ Save User Answers & Score
    await setDoc(userProgressRef, {
      answers: this.userAnswers,
      score: score,
    },{ merge: true });  // ✅ Merge to prevent overwriting other data


    // ✅ Update Assignment Completion Status
    const userCourseProgressRef = doc(this.firestore, `courses/${this.courseId}/users/${userId}`);
    await updateDoc(userCourseProgressRef, { [`${this.materialId}_assignment_completed`]: true});

    this.userScore = score;
    this.assignmentSubmitted = true;

    console.log(`Assignment submitted! Score: ${score}`);

    // ✅ Unlock next study material
    this.studyMaterialService.unlockNextStudyMaterial(this.courseId!, userId, this.materialId!);

    // ✅ Navigate back to interface and trigger progress update
    setTimeout(() => {
      this.router.navigate([`/interface/${this.courseId}`], { state: { refresh: true } });
    }, 2000);
  });
}

}
