// import { Injectable, inject } from '@angular/core';
// import { Firestore, doc, updateDoc } from '@angular/fire/firestore';

// @Injectable({
//   providedIn: 'root',
// })
// export class StudyMaterialService {
//   private firestore = inject(Firestore);

//   constructor() {}

//   /** ✅ Unlock the next study material after assignment submission */
//   unlockNextStudyMaterial(courseId: string, userId: string, materialId: string, studyMaterials: any[]): void {
//     if (!courseId || !materialId || studyMaterials.length === 0) return;

//     const currentIndex = studyMaterials.findIndex(m => m.id === materialId);

//     if (currentIndex !== -1 && currentIndex + 1 < studyMaterials.length) {
//       const nextMaterialId = studyMaterials[currentIndex + 1].id;
//       const userProgressRef = doc(this.firestore, `courses/${courseId}/users/${userId}`);

//       updateDoc(userProgressRef, { [`${nextMaterialId}_unlocked`]: true })
//         .then(() => {
//           console.log(`Next study material ${nextMaterialId} unlocked for user ${userId}.`);
//         })
//         .catch((error) => {
//           console.error('Error unlocking next study material:', error);
//         });
//     }
//   }

  
// }


import { Injectable, inject } from '@angular/core';
import { Firestore, doc, updateDoc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class StudyMaterialService {
  private firestore = inject(Firestore);

  constructor() {}

  /** ✅ Unlock the next study material after assignment submission */
  async unlockNextStudyMaterial(courseId: string, userId: string, materialId: string): Promise<void> {
    if (!courseId || !materialId) return;

    try {
      // ✅ Fetch user progress from Firestore
      const userProgressRef = doc(this.firestore, `courses/${courseId}/users/${userId}`);
      const userProgressSnap = await getDoc(userProgressRef);

      if (!userProgressSnap.exists()) {
        console.error(`No progress found for user ${userId} in course ${courseId}`);
        return;
      }

      const progressData = userProgressSnap.data();
      const studyMaterials = Object.keys(progressData).filter(key => key.includes('_completed')).map(key => key.replace('_completed', ''));

      // ✅ Find current index of the material
      const currentIndex = studyMaterials.findIndex(id => id === materialId);

      if (currentIndex !== -1 && currentIndex + 1 < studyMaterials.length) {
        const nextMaterialId = studyMaterials[currentIndex + 1];

        // ✅ Unlock the next study material in Firestore
        await updateDoc(userProgressRef, { [`${nextMaterialId}_unlocked`]: true });
        console.log(`Next study material ${nextMaterialId} unlocked for user ${userId}.`);
      }
    } catch (error) {
      console.error('Error unlocking next study material:', error);
    }
  }
}
