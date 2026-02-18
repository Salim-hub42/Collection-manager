import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig) // bootstrapApplication est une fonction d'Angular qui permet de démarrer une application Angular en utilisant un composant racine et une configuration d'application.
  .catch((err: unknown) => console.error(err));
