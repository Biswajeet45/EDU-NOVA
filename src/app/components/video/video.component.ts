// import { Component, OnInit, inject } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { Firestore, doc, getDoc } from '@angular/fire/firestore';
// import { SafeUrlPipe } from './safe-url.pipe';

// @Component({
//   selector: 'app-video',
//   standalone: true,
//   imports: [CommonModule, SafeUrlPipe],
//   templateUrl: './video.component.html',
//   styleUrls: ['./video.component.css']
// })
// export class VideoComponent implements OnInit {
//   courseId: string | null = null;
//   materialId: string | null = null;
//   courseName: string | null = null;
//   materialTitle: string | null = null;
//   videoUrls: string[] = []; // Store video URLs

//   private route = inject(ActivatedRoute);
//   private firestore = inject(Firestore);

//   async ngOnInit(): Promise<void> {
//     this.courseId = this.route.snapshot.paramMap.get('courseId');
//     this.materialId = this.route.snapshot.paramMap.get('materialId');
//     this.courseName = this.route.snapshot.paramMap.get('courseName');
//     this.materialTitle = this.route.snapshot.paramMap.get('materialTitle');

//     this.courseName = this.courseName ? decodeURIComponent(this.courseName) : null;
//     this.materialTitle = this.materialTitle ? decodeURIComponent(this.materialTitle) : null;

//     console.log("Loading Video for:", this.materialTitle);
    
//     if (this.courseId && this.materialId) {
//       await this.fetchVideoUrls();
//     }
//   }

//   /** ✅ Fetch video URLs from Firestore */
//   async fetchVideoUrls(): Promise<void> {
//     const materialRef = doc(this.firestore, `courses/${this.courseId}`);
//     const materialSnap = await getDoc(materialRef);
  
//     if (materialSnap.exists()) {
//       const courseData = materialSnap.data() as { materials?: any[] }; // Explicit typing
//       const materials = courseData?.materials || []; // Ensure materials is an array
  
//       const material = materials.find((m: any) => m.id === this.materialId);
//       if (material) {
//         this.videoUrls = material.videos || [];
//       } else {
//         console.error(`Material with ID ${this.materialId} not found`);
//       }
//     } else {
//       console.error(`Course with ID ${this.courseId} not found`);
//     }
//   }
  
// }


// import { Component, OnInit, inject } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { SafeUrlPipe } from './safe-url.pipe';
// // Ensure the correct path

// @Component({
//   selector: 'app-video',
//   standalone: true,
//   imports: [CommonModule, SafeUrlPipe], // Ensure SafeUrlPipe is standalone
//   templateUrl: './video.component.html',
//   styleUrls: ['./video.component.css']
// })
// export class VideoComponent implements OnInit {
//   courseId: string | null = null;
//   materialId: string | null = null;
//   courseName: string | null = null;
//   materialTitle: string | null = null;
//   videoUrls: string[] = []; // ✅ Declare videoUrls to avoid the error

//   private route = inject(ActivatedRoute);

//   ngOnInit(): void {
//     this.courseId = this.route.snapshot.paramMap.get('courseId');
//     this.materialId = this.route.snapshot.paramMap.get('materialId');
//     this.courseName = this.courseName ? decodeURIComponent(this.courseName) : null;
//     this.materialTitle = this.materialTitle ? decodeURIComponent(this.materialTitle) : null;

//     console.log("Loaded Video for:", this.materialTitle);

//     // ✅ Mock data (Replace this with actual Firestore fetching logic)
//     // this.videoUrls = [
//     //   "https://www.youtube.com/embed/tgbNymZ7vqY", 
//     //   "https://www.youtube.com/embed/kJQP7kiw5Fk"
//     // ];

    

//   }
// }

// import { Component, OnInit, inject } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { Firestore, collection, doc, getDoc } from '@angular/fire/firestore'; 
// import { SafeUrlPipe } from './safe-url.pipe'; // Ensure correct path

// @Component({
//   selector: 'app-video',
//   standalone: true,
//   imports: [CommonModule, SafeUrlPipe], // Ensure SafeUrlPipe is standalone
//   templateUrl: './video.component.html',
//   styleUrls: ['./video.component.css']
// })
// export class VideoComponent implements OnInit {
//   courseId: string | null = null;
//   materialId: string | null = null;
//   courseName: string | null = null;
//   materialTitle: string | null = null;
//   videoUrls: string[] = []; // ✅ Declare videoUrls to avoid error

//   private route = inject(ActivatedRoute);
//   private firestore = inject(Firestore); // Inject Firestore

//   async ngOnInit(): Promise<void> {
//     this.courseId = this.route.snapshot.paramMap.get('courseId');
//     this.materialId = this.route.snapshot.paramMap.get('materialId');
//     this.courseName = this.courseName ? decodeURIComponent(this.courseName) : null;
//     this.materialTitle = this.materialTitle ? decodeURIComponent(this.materialTitle) : null;

//     console.log("Loaded Video for:", this.materialTitle);

//     if (this.courseId && this.materialId) {
//       await this.fetchMaterialVideos(this.courseId, this.materialId);
//     } else {
//       console.warn("Invalid course ID or material ID");
//     }
//   }

//   // async fetchMaterialVideos(courseId: string, materialId: string): Promise<void> {
//   //   try {
//   //     const courseDocRef = doc(this.firestore, `courses/${courseId}`);
//   //     const courseSnapshot = await getDoc(courseDocRef);
  
//   //     if (courseSnapshot.exists()) {
//   //       const courseData = courseSnapshot.data();
  
//   //       if (courseData && courseData['materials']) {  // ✅ Access with bracket notation
//   //         const materialsArray = courseData['materials']; // Extract array
  
//   //         if (Array.isArray(materialsArray)) {  // ✅ Ensure it's an array
//   //           const material = materialsArray.find((m: any) => m.id === materialId);
  
//   //           if (material) {
//   //             this.videoUrls = material.videos || [];
//   //             console.log("Videos Loaded:", this.videoUrls);
//   //           } else {
//   //             console.warn("Material not found in Firestore.");
//   //           }
//   //         } else {
//   //           console.warn("Materials field is not an array.");
//   //         }
//   //       } else {
//   //         console.warn("No materials found in Firestore document.");
//   //       }
//   //     } else {
//   //       console.warn("Course not found in Firestore.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching material videos:", error);
//   //   }
//   // }

//   async fetchMaterialVideos(courseId: string, materialId: string): Promise<void> {
//     try {
//       const courseDocRef = doc(this.firestore, `courses/${courseId}`);
//       const courseSnapshot = await getDoc(courseDocRef);
  
//       if (courseSnapshot.exists()) {
//         const courseData = courseSnapshot.data();
  
//         if (courseData && courseData['materials']) {
//           const materialsArray = courseData['materials'];
  
//           if (Array.isArray(materialsArray)) {
//             const material = materialsArray.find((m: any) => m.id === materialId);
  
//             if (material) {
//               this.videoUrls = material.videos || [];
//               console.log("Videos Loaded:", this.videoUrls);
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
//       console.error("Error fetching material videos:", error);
//     }
//   }
  
// }

import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Firestore, doc, getDoc } from '@angular/fire/firestore'; 
import { SafeUrlPipe } from './safe-url.pipe'; // Ensure correct path

// ✅ Define Video Interface
interface Video {
  title: string;
  url: string;
}

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe], // Ensure SafeUrlPipe is standalone
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  courseId: string | null = null;
  materialId: string | null = null;
  courseName: string | null = null;
  materialTitle: string | null = null;
  videoList: Video[] = []; // ✅ Store video objects
  isLoading: boolean = true; // ✅ Add loading state

  private route = inject(ActivatedRoute);
  private firestore = inject(Firestore);

  async ngOnInit(): Promise<void> {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.materialId = this.route.snapshot.paramMap.get('materialId');
    this.courseName = this.courseName ? decodeURIComponent(this.courseName) : null;
    this.materialTitle = this.materialTitle ? decodeURIComponent(this.materialTitle) : null;

    console.log("Loaded Video for:", this.materialTitle);

    if (this.courseId && this.materialId) {
      await this.fetchMaterialVideos(this.courseId, this.materialId);
    } else {
      console.warn("Invalid course ID or material ID");
    }
  }

  async fetchMaterialVideos(courseId: string, materialId: string): Promise<void> {
    try {
      this.isLoading = true; // ✅ Show loading
      const courseDocRef = doc(this.firestore, `courses/${courseId}`);
      const courseSnapshot = await getDoc(courseDocRef);

      if (courseSnapshot.exists()) {
        const courseData = courseSnapshot.data();

        if (courseData && courseData['materials']) {
          const materialsArray = courseData['materials'];

          if (Array.isArray(materialsArray)) {
            const material = materialsArray.find((m: any) => m.id === materialId);

            if (material) {
              this.videoList = material.videos || []; // ✅ Store video objects
              console.log("Videos Loaded:", this.videoList);
            } else {
              console.warn("Material not found in Firestore.");
            }
          } else {
            console.warn("Materials field is not an array.");
          }
        } else {
          console.warn("No materials found in Firestore document.");
        }
      } else {
        console.warn("Course not found in Firestore.");
      }
    } catch (error) {
      console.error("Error fetching material videos:", error);
    } finally {
      this.isLoading = false; // ✅ Hide loading after fetching
    }
  }
}
