// src/app/app.config.ts
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Active la détection de changement sans Zone.js pour de meilleures performances
    provideZonelessChangeDetection(),
    
    // Configure le routeur avec les routes définies et active le binding des paramètres de route aux entrées (@Input) des composants
    provideRouter(
      routes, 
      withComponentInputBinding() 
    )
  ],
};
