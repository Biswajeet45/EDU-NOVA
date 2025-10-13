// import { Component, OnInit, inject } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Firestore, doc, docData, updateDoc } from '@angular/fire/firestore';
// import { Auth, onAuthStateChanged } from '@angular/fire/auth';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-interface',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   templateUrl: './interface.component.html',
//   styleUrls: ['./interface.component.css'],

  
// })

// interface StudyMaterial {
//   id: string;
//   title: string;
//   completed: boolean;
//   assignmentCompleted: boolean;
//   assignmentUnlocked: boolean;
//   unlocked: boolean;
//   videos: string[];
// }
// export class InterfaceComponent implements OnInit {
  
//   courseId: string | null = null;
//   userId: string | null = null;
//   courseName: string = '';
//   studyMaterials: StudyMaterial[] = [];

//   progress: number = 0;

//   private route = inject(ActivatedRoute);
//   private firestore = inject(Firestore);
//   private auth = inject(Auth);
//   private router = inject(Router);

  

//   ngOnInit(): void {
//     this.courseId = this.route.snapshot.paramMap.get('id');

//     onAuthStateChanged(this.auth, (user) => {
//       if (user) {
//         this.userId = user.uid;
//         if (this.courseId) {
//           this.loadCourseDetails();
//           this.loadUserProgress();
//         }
//       } else {
//         console.error('No user logged in.');
//       }
//     });
//   }

//   /** ✅ Fetch course materials from Firestore */
//   // loadCourseDetails(): void {
//   //   if (!this.courseId) return;

//   //   const courseRef = doc(this.firestore, `courses/${this.courseId}`);
//   //   docData(courseRef).subscribe((course: any) => {
//   //     if (!course) return;

//   //     this.courseName = course.name || 'Unknown Course';
//   //     this.studyMaterials = course.materials
//   //       ? course.materials.map((material: any) => ({
//   //           id: material.id || '',
//   //           title: material.title || 'Untitled',
//   //           completed: false, // Will be updated when fetching progress
//   //           videos: material.videos || [],
//   //         }))
//   //       : [];

//   //     // Fetch user progress after loading materials
//   //     this.loadUserProgress();
//   //   });
//   // }

//   // /** ✅ Fetch user progress from Firestore */
//   // loadUserProgress(): void {
//   //   if (!this.courseId || !this.userId) return;

//   //   const userProgressRef = doc(this.firestore, `courses/${this.courseId}/users/${this.userId}`);
//   //   docData(userProgressRef).subscribe((progress: any) => {
//   //     if (!progress) return;

//   //     // Update the completion status of study materials
//   //     this.studyMaterials.forEach((material) => {
//   //       material.completed = progress[`${material.id}_completed`] || false;
//   //     });

//   //     this.calculateProgress();
//   //   });
//   // }

//   // /** ✅ Unlock next section and update progress */
//   // unlockNextSection(index: number, materialId: string): void {
//   //   if (!this.courseId || !this.userId) return;

//   //   const selectedMaterial = this.studyMaterials[index];

//   //   const encodedCourseName = encodeURIComponent(this.courseName);
//   //   const encodedMaterialTitle = encodeURIComponent(selectedMaterial.title);

//   //   const userProgressRef = doc(this.firestore, `courses/${this.courseId}/users/${this.userId}`);

//   //   updateDoc(userProgressRef, { [`${materialId}_completed`]: true })
//   //     .then(() => {
//   //       console.log(`Material ${materialId} marked as completed for user ${this.userId}.`);
//   //       this.studyMaterials[index].completed = true;
//   //       this.calculateProgress();

//   //       // ✅ Navigate to Video Component
//   //       this.router.navigate([`/video/${this.courseId}/${materialId}/${encodedCourseName}/${encodedMaterialTitle}`]);
//   //     })
//   //     .catch((error) => {
//   //       console.error('Error updating progress:', error);
//   //     });
//   // }


//   loadCourseDetails(): void {
//     if (!this.courseId) return;
  
//     const courseRef = doc(this.firestore, `courses/${this.courseId}`);
//     docData(courseRef).subscribe((course: any) => {
//       if (!course) return;
  
//       this.courseName = course.name || 'Unknown Course';
//       this.studyMaterials = course.materials
//         ? course.materials.map((material: any, index: number) => ({
//             id: material.id || '',
//             title: material.title || 'Untitled',
//             completed: false,
//             assignmentCompleted: false,
//             assignmentUnlocked: index === 0, // First assignment should be unlocked initially
//             unlocked: index === 0, // First material is unlocked, others locked
//             videos: material.videos || [],
//           }))
//         : [];
  
//       this.loadUserProgress();
//     });
//   }
  

  
//   loadUserProgress(): void {
//     if (!this.courseId || !this.userId) return;
  
//     const userProgressRef = doc(this.firestore, `courses/${this.courseId}/users/${this.userId}`);
//     docData(userProgressRef).subscribe((progress: any) => {
//       if (!progress) return;
  
//       this.studyMaterials.forEach((material, index) => {
//         material.completed = progress[`${material.id}_completed`] || false;
//         material['assignmentCompleted'] = progress[`${material.id}_assignment_completed`] || false;
  
//         // Unlock assignment only if the study material is completed
//         // Unlock assignment only if the study material is completed
//         material['assignmentUnlocked'] = material.completed;
  
//         // Unlock the next study material only if the previous assignment is completed
//         if (index > 0) {
//           this.studyMaterials[index]['unlocked'] = this.studyMaterials[index - 1]['assignmentCompleted'];
//         }
//       });
  
//       this.calculateProgress();
//     });
//   }

//   unlockNextSection(index: number, materialId: string): void {
//     if (!this.courseId || !this.userId) return;
  
//     // Prevent unlocking if the previous assignment isn't completed
//     if (index > 0 && !this.studyMaterials[index - 1]['assignmentCompleted']) {
//       console.log('Complete the previous assignment first.');
//       return;
//     }
  
//     const selectedMaterial = this.studyMaterials[index];
//     const encodedCourseName = encodeURIComponent(this.courseName);
//     const encodedMaterialTitle = encodeURIComponent(selectedMaterial.title);
  
//     const userProgressRef = doc(this.firestore, `courses/${this.courseId}/users/${this.userId}`);
  
//     updateDoc(userProgressRef, { [`${materialId}_completed`]: true })
//       .then(() => {
//         console.log(`Material ${materialId} marked as completed for user ${this.userId}.`);
//         this.studyMaterials[index].completed = true;
//         this.calculateProgress();
  
//         // ✅ Navigate to Video Component
//         this.router.navigate([`/video/${this.courseId}/${materialId}/${encodedCourseName}/${encodedMaterialTitle}`]);
  
//         // Unlock assignment for this study material
//         // Unlock assignment for this study material
//         this.studyMaterials[index]['assignmentUnlocked'] = true;
//       })
//       .catch((error) => {
//         console.error('Error updating progress:', error);
//       });
//   }
  
  








//   /** ✅ Calculate progress percentage */
//   calculateProgress(): void {
//     if (!this.studyMaterials.length) return;
//     const completedCount = this.studyMaterials.filter((m) => m.completed).length;
//     this.progress = Math.round((completedCount / this.studyMaterials.length) * 100);
//   }

//   /** ✅ Navigate to the assignment page */
//   startAssignment(index: number): void {
//     if (!this.courseId) return;

//     const materialId = this.studyMaterials[index].id;
//     const materialTitle = encodeURIComponent(this.studyMaterials[index].title);

//     console.log(`Starting assignment for ${this.studyMaterials[index].title}`);

//     this.router.navigate([`/assignment/${this.courseId}/${materialId}/${materialTitle}`]);
//   }
// }








import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, doc, docData, getDoc, updateDoc } from '@angular/fire/firestore';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
interface StudyMaterial {
  score: any;
  id: string;
  title: string;
  completed: boolean;
  assignmentCompleted: boolean;
  assignmentUnlocked: boolean;
  unlocked: boolean;
  videos: string[];
}

@Component({
  selector: 'app-interface',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css'],
})
export class InterfaceComponent implements OnInit {
  courseId: string | null = null;
  userId: string | null = null;
  courseName: string = '';
  studyMaterials: StudyMaterial[] = [];
  progress: number = 0;
  userProgress: { [materialId: string]: { completed: boolean; score?: number } } = {};


  private route = inject(ActivatedRoute);
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private router = inject(Router);

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userId = user.uid;
        if (this.courseId) {
          this.loadCourseDetails();
          this.loadUserProgress();
        }
      } else {
        console.error('No user logged in.');
      }
    });

     // ✅ Reload progress when navigating back from Assignment Component
  this.router.events.subscribe(() => {
    this.loadUserProgress();
  });

      // ✅ Detect if progress needs refreshing (after assignment submission)
  const state = history.state;
  if (state && state.refresh) {
    console.log("Refreshing progress after assignment submission...");
    this.loadUserProgress();
  }
  }

  /** ✅ Fetch course materials from Firestore */
  loadCourseDetails(): void {
    if (!this.courseId) return;

    const courseRef = doc(this.firestore, `courses/${this.courseId}`);
    docData(courseRef).subscribe((course: any) => {
      if (!course) return;

      this.courseName = course.name || 'Unknown Course';
      this.studyMaterials = course.materials
        ? course.materials.map((material: any, index: number) => ({
            id: material.id || '',
            title: material.title || 'Untitled',
            completed: false,
            assignmentCompleted: false,
            assignmentUnlocked: index === 0, // First assignment should be unlocked initially
            unlocked: index === 0, // First material is unlocked, others locked
            videos: material.videos || [],
          }))
        : [];

      this.loadUserProgress();
    });
  }



/** ✅ Fetch user progress from Firestore */
loadUserProgress(): void {
  if (!this.courseId || !this.userId) return;

  const userProgressRef = doc(this.firestore, `courses/${this.courseId}/users/${this.userId}`);
  docData(userProgressRef).subscribe(async (progress: any) => {
    if (!progress) return;

    this.studyMaterials.forEach((material, index) => {
      material.completed = progress[`${material.id}_completed`] || false;
      material.assignmentCompleted = progress[`${material.id}_assignment_completed`] || false;

      // ✅ Unlock assignment only if the study material is completed
      material.assignmentUnlocked = material.completed;

      // ✅ Unlock the next study material ONLY after assignment is completed
      if (index > 0) {
        this.studyMaterials[index].unlocked = this.studyMaterials[index - 1].assignmentCompleted;
      }
    });

    // ✅ Fetch all scores asynchronously
    const scorePromises = this.studyMaterials.map(async (material) => {
      const assignmentRef = doc(this.firestore, `courses/${this.courseId}/users/${this.userId}/assignments/${material.id}`);

      const assignmentSnap = await getDoc(assignmentRef);
      
      // ✅ Debugging: Check if document exists
      console.log(`📌 Checking Firestore for ${material.id}:`, assignmentSnap.exists() ? "✅ Found" : "❌ Not Found");
      
      // ✅ Debugging: Print full Firestore data
      if (assignmentSnap.exists()) {
        const assignmentData = assignmentSnap.data();
        console.log(`📌 Retrieved Data for ${material.id}:`, assignmentData);
      
        // ✅ Use bracket notation and set default value
        material.score = assignmentData?.['score'] ?? 0;  
      } else {
        material.score = 0; // ✅ Default to 0 if no document found
      }
      
    });

    await Promise.all(scorePromises); // ✅ Wait for all scores to be fetched

    // ✅ Recalculate progress ONLY after assignment completion
    const completedAssignments = this.studyMaterials.filter(m => m.assignmentCompleted).length;
    this.progress = Math.round((completedAssignments / this.studyMaterials.length) * 100);
    
    console.log("✅ Updated progress:", this.progress);
    console.log("✅ Retrieved Scores:", this.studyMaterials.map(m => ({ id: m.id, score: m.score })));
  });
}


  /** ✅ Fetch user progress from Firestore */
//   loadUserProgress(): void {
//   if (!this.courseId || !this.userId) return;

//   const userProgressRef = doc(this.firestore, `courses/${this.courseId}/users/${this.userId}`);
//   docData(userProgressRef).subscribe((progress: any) => {
//     if (!progress) return;

//     this.studyMaterials.forEach((material, index) => {
//       material.completed = progress[`${material.id}_completed`] || false;
//       material.assignmentCompleted = progress[`${material.id}_assignment_completed`] || false;
//       material.score = progress[`${material.id}_assignment_score`] || 0;
//       // ✅ Unlock assignment only if the study material is completed
//       material.assignmentUnlocked = material.completed;

//       // ✅ Unlock the next study material ONLY after assignment is completed
//       if (index > 0) {
//         this.studyMaterials[index].unlocked = this.studyMaterials[index - 1].assignmentCompleted;
//       }
//     });

      
//     // ✅ Recalculate progress ONLY after assignment completion
//     const completedAssignments = this.studyMaterials.filter(m => m.assignmentCompleted).length;
//     this.progress = Math.round((completedAssignments / this.studyMaterials.length) * 100);
//     console.log("✅ Updated progress:", this.progress);
//     console.log("✅ Retrieved Scores:", this.studyMaterials.map(m => ({ id: m.id, score: m.score })));
//   });
// }

/** ✅ Fetch user progress from Firestore */
// loadUserProgress(): void {
//   if (!this.courseId || !this.userId) return;

//   const userProgressRef = doc(this.firestore, `courses/${this.courseId}/users/${this.userId}`);
//   docData(userProgressRef).subscribe((progress: any) => {
//     if (!progress) return;

//     this.studyMaterials.forEach((material, index) => {
//       material.completed = progress[`${material.id}_completed`] || false;
//       material.assignmentCompleted = progress[`${material.id}_assignment_completed`] || false;

//       // ✅ Unlock assignment only if the study material is completed
//       material.assignmentUnlocked = material.completed;

//       // ✅ Unlock the next study material ONLY after assignment is completed
//       if (index > 0) {
//         this.studyMaterials[index].unlocked = this.studyMaterials[index - 1].assignmentCompleted;
//       }
//     });

//     // ✅ Recalculate progress
//     const completedAssignments = this.studyMaterials.filter(m => m.assignmentCompleted).length;
//     this.progress = Math.round((completedAssignments / this.studyMaterials.length) * 100);

//     console.log("Updated progress:", this.progress);
//   });
// }


  

  /** ✅ Unlock next section and update progress */

  
  unlockNextSection(index: number, materialId: string): void {
    if (!this.courseId || !this.userId) return;
  
    // Prevent unlocking if the previous assignment isn't completed
    if (index > 0 && !this.studyMaterials[index - 1].assignmentCompleted) {
      console.log('Complete the previous assignment first.');
      return;
    }
  
    const selectedMaterial = this.studyMaterials[index];
    const encodedCourseName = encodeURIComponent(this.courseName);
    const encodedMaterialTitle = encodeURIComponent(selectedMaterial.title);
    const userProgressRef = doc(this.firestore, `courses/${this.courseId}/users/${this.userId}`);
  
    updateDoc(userProgressRef, { [`${materialId}_completed`]: true })
      .then(() => {
        console.log(`Material ${materialId} marked as completed for user ${this.userId}.`);
        this.studyMaterials[index].completed = true;
  
        // ✅ Unlock the assignment for this study material (not the next material)
        this.studyMaterials[index].assignmentUnlocked = true;
  
        // ✅ Navigate to Video Component
        this.router.navigate([`/video/${this.courseId}/${materialId}/${encodedCourseName}/${encodedMaterialTitle}`]);
      })
      .catch((error) => {
        console.error('Error updating progress:', error);
      });
  }
  
  

  /** ✅ Calculate progress percentage */
  calculateProgress(): void {
    if (!this.studyMaterials.length) return;
    const completedCount = this.studyMaterials.filter((m) => m.completed).length;
    this.progress = Math.round((completedCount / this.studyMaterials.length) * 100);
  }

  /** ✅ Navigate to the assignment page */
  startAssignment(index: number): void {
    if (!this.courseId) return;
  
    const materialId = this.studyMaterials[index].id;
    const materialTitle = encodeURIComponent(this.studyMaterials[index].title);
  
    console.log(`Starting assignment for ${this.studyMaterials[index].title}`);
  
    this.router.navigate([`/assignment/${this.courseId}/${materialId}/${materialTitle}`], {
      state: { studyMaterials: this.studyMaterials },
    }).then(() => {
      // ✅ Reload user progress after returning from the assignment page
      setTimeout(() => {
        this.loadUserProgress();
      }, 2000);  // Small delay to allow Firestore to update
    });
  }
}







// import { Component } from '@angular/core';
// import { FirestoreService } from '../../services/firestore.service';
// @Component({
//   selector: 'app-interface',
//   templateUrl: './interface.component.html',
//   styleUrls: ['./interface.component.css'],
// })
// export class InterfaceComponent {
//   constructor(private firestoreService: FirestoreService) {}

//   addMaterials() {
//     this.firestoreService.updateMaterials('3'); // Pass the course ID ('1' in this case)
//   }
// }
