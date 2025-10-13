import { bootstrapApplication } from '@angular/platform-browser';

import { provideRouter } from '@angular/router';
import { VideoComponent } from '../video/video.component';
import { InterfaceComponent } from './interface.component';


bootstrapApplication(InterfaceComponent, {
  providers: [
    provideRouter([
      { path: '', component: InterfaceComponent },
      { path: 'video', component: VideoComponent },
    ])
  ]
});
