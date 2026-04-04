import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../../services/login/login-service/login-service';
import { catchError, map } from 'rxjs/operators';

export const isLoggedInGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService); // Injection du service de connexion pour vérifier l'état de connexion de l'utilisateur
  const router = inject(Router); // Injection du routeur pour rediriger l'utilisateur si nécessaire

  if (loginService.user() === undefined) {// Si le signal user est à undefined, cela signifie que l'état de connexion n'a pas encore été déterminé, donc on tente de récupérer les informations de l'utilisateur connecté
    return loginService.getUser().pipe(// Utilisation de l'opérateur map pour retourner true si la récupération des informations de l'utilisateur est réussie, sinon redirection vers la page de connexion
      map(_ => true),
      catchError(_ => router.navigate(['/login']))
    )
  }



  if (!loginService.user()) {
    router.navigate(['/login']); // Si le signal user est à null, cela signifie que l'utilisateur n'est pas connecté, donc on redirige vers la page de connexion
  }

  return true;
};
