// src/app/app.config.ts
import { ApplicationConfig, provideZonelessChangeDetection, LOCALE_ID } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { routes } from './app.routes';

registerLocaleData(localeFr, 'fr-FR');

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    // Active la détection de changement sans Zone.js pour de meilleures performances
    provideZonelessChangeDetection(),

    // Configure le routeur avec les routes définies et active le binding des paramètres de route aux entrées (@Input) des composants
    provideRouter(routes, withComponentInputBinding()),
  ],
};
