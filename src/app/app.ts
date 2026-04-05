import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { LoginService } from './services/login/login-service/login-service';
import { MainMenu } from './components/main-menu/main-menu';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainMenu],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush // ChangeDetectionStrategy.OnPush est une stratégie de détection des changements dans Angular
  //  qui permet d'optimiser les performances en limitant les vérifications de changement aux composants qui ont des entrées modifiées.
  //  Avec cette stratégie, Angular ne vérifie les changements que lorsque les entrées d'un composant changent, plutôt que de vérifier tous les composants
  //  à chaque cycle de détection des changements.
  //  Cela peut améliorer les performances en réduisant le nombre de vérifications nécessaires,
  //  surtout dans les applications avec de nombreux composants ou des données volumineuses.
})
export class App {

  private loginService = inject(LoginService); // Injection du service de connexion pour gérer l'état de l'utilisateur

  protected user = this.loginService.user; // Signal pour stocker les informations de l'utilisateur connecté, récupéré depuis le service de connexion



}
