import { Component, output, OutputEmitterRef, model, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBar {

  search = model('Initial'); //model est une fonction qui crée une propriété réactive dans un composant Angular.
  //  Elle permet de lier une variable à une valeur initiale et de suivre les changements de cette variable au fil du temps. Lorsque la valeur de la variable change,
  //  le composant peut réagir en conséquence, par exemple en mettant à jour l'affichage ou en déclenchant d'autres actions.
  //  c'est un output qui émet un événement lorsque le bouton de recherche est cliqué.
  //  L'OutputEmitterRef est une référence à un émetteur d'événements qui peut être utilisé pour émettre des événements personnalisés à partir du composant.

  searchButtonClicked: OutputEmitterRef<void> = output<void>();

  searchClicked() {
    this.searchButtonClicked.emit();
  }






}
