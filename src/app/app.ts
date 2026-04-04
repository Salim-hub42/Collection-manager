import { Component, ChangeDetectionStrategy, OnDestroy, inject } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { LoginService } from './services/login/login-service/login-service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatAnchor],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush // ChangeDetectionStrategy.OnPush est une stratégie de détection des changements dans Angular
  //  qui permet d'optimiser les performances en limitant les vérifications de changement aux composants qui ont des entrées modifiées.
  //  Avec cette stratégie, Angular ne vérifie les changements que lorsque les entrées d'un composant changent, plutôt que de vérifier tous les composants
  //  à chaque cycle de détection des changements.
  //  Cela peut améliorer les performances en réduisant le nombre de vérifications nécessaires,
  //  surtout dans les applications avec de nombreux composants ou des données volumineuses.
})
export class App implements OnDestroy {

  private loginService = inject(LoginService); // Injection du service de connexion pour gérer l'état de l'utilisateur
  private router = inject(Router); // Injection du routeur pour la navigation

  protected user = this.loginService.user; // Signal pour stocker les informations de l'utilisateur connecté, récupéré depuis le service de connexion

  private logoutSubscription: Subscription | null = null; // Subscription pour gérer les abonnements liés à la déconnexion, initialisée à null

  logout() {
    this.logoutSubscription = this.loginService.logout().subscribe({
      next: () => this.router.navigate(['login']), // Navigation vers la page de connexion après la déconnexion réussie
      error: (err) => console.error(['login']) // Gestion des erreurs de déconnexion
    });
  }

  ngOnDestroy(): void {
    this.logoutSubscription?.unsubscribe(); // Nettoyage de la subscription lors de la destruction du composant pour éviter les fuites de mémoire
  }

}
