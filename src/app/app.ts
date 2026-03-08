import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
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

}
