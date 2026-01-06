import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';


// Add:
import { provideHttpClient, withFetch } from '@angular/common/http';  // Data


// User JSON 
// import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay())
  
     // Add: Data
    ,provideHttpClient(withFetch()) 
    ,provideRouter(routes)

    // User JSON 
    // ,provideAnimations()
  
  ]
};
