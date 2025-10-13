// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { routes } from './app.routes';
// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { getAuth, provideAuth } from '@angular/fire/auth';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(routes), 
//     provideFirebaseApp(() => initializeApp({"projectId":"edunova-1-24074","appId":"1:1083682361751:web:64497630fdbfdeeaf034d2","storageBucket":"edunova-1-24074.firebasestorage.app","apiKey":"AIzaSyBMEGofasiC-9OZhborSBvSNYm7-YXEvRM","authDomain":"edunova-1-24074.firebaseapp.com","messagingSenderId":"1083682361751"})), provideAuth(() => getAuth())
//   ]
// };
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';  // ✅ Add Firestore support

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: "edunova-1-24074",
        appId: "1:1083682361751:web:64497630fdbfdeeaf034d2",
        storageBucket: "edunova-1-24074.appspot.com", // ✅ Correct format
        apiKey: "AIzaSyBMEGofasiC-9OZhborSBvSNYm7-YXEvRM",
        authDomain: "edunova-1-24074.firebaseapp.com",
        messagingSenderId: "1083682361751",
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()), // ✅ Ensure Firestore is provided
  ],
};
