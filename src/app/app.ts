import { Component, computed, signal, effect, ChangeDetectionStrategy } from '@angular/core';
import { CollectionItemCard } from './components/collection-item-card/collection-item-card';
import { CollectionItem } from './models/collection-item';
import { SearchBar } from './components/search-bar/search-bar';

@Component({
  selector: 'app-root',
  imports: [CollectionItemCard, SearchBar],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {

  soldat!: CollectionItem; //le point d'exclamation après le nom de la variable indique que cette variable est définie, même si elle n'est pas initialisée immédiatement. Cela permet d'éviter les erreurs de compilation liées à l'utilisation de variables non initialisées.
  boubou!: CollectionItem;
  count = 0;
  searchText = '';

  ItemList: CollectionItem[] = [];

  //signal est une fonction qui crée une propriété réactive dans un composant Angular.
  //  Elle permet de lier une variable à une valeur initiale (ici 0) et de suivre les changements de cette variable au fil du temps.
  //  Lorsque la valeur de la variable change, le composant peut réagir en conséquence, par exemple en mettant à jour l'affichage ou en déclenchant d'autres actions.
  selectedItemIndex = signal(0);


  //computed est une fonction qui crée une propriété calculée dans un composant Angular.
  //  Elle permet de définir une variable qui dépend d'autres variables et qui est automatiquement recalculée lorsque ces variables changent.
  //  Dans ce cas, selectedItem est une propriété calculée qui retourne l'élément de la liste ItemList à l'index spécifié par selectedItemIndex. 
  //  Chaque fois que selectedItemIndex change, selectedItem sera automatiquement mis à jour pour refléter le nouvel élément sélectionné.
  selectedItem = computed(() => {
    return this.ItemList[this.selectedItemIndex()];
  });


  //logEffect est une fonction qui crée un effet dans un composant Angular. Un effet est une fonction qui s'exécute chaque fois que les variables réactives utilisées à l'intérieur de l'effet changent.
  //  Dans ce cas, logEffect est un effet qui affiche dans la console les valeurs de selectedItemIndex et selectedItem chaque fois que l'une de ces variables change. 
  //  Cela permet de suivre les changements de l'index sélectionné et de l'élément sélectionné dans la liste.
  logEffect = effect(() => {
    console.log(this.selectedItemIndex(), this.selectedItem());
  });



  constructor() { //le constructeur est une fonction spéciale qui est appelée lors de la création d'une instance de la classe.
    //  Il est utilisé pour initialiser les propriétés de l'objet et effectuer toute configuration nécessaire.
    //  Il sert à préparer l'objet pour une utilisation ultérieure en lui donnant des valeurs initiales ou en exécutant du code d'initialisation.
    this.soldat = new CollectionItem();
    this.soldat.name = "Chichi";
    this.soldat.rarity = "Furyeuse";
    this.soldat.description = "Une soldat courageuse, prête à défendre son honneur sur le champ de bataille.";
    this.soldat.price = 150;
    this.soldat.image = "img/chichi.png";

    this.boubou = new CollectionItem();
    this.boubou.name = "Boubou";
    this.boubou.rarity = "Bubble-gum";
    this.boubou.description = "Un boubou mystique avec des pouvoirs magiques puissants.";
    this.boubou.price = 250;
    this.boubou.image = "img/boubou.png";

    this.ItemList = [this.boubou, this.soldat]


  }

  incrementCount() {
    this.count++;
  }

  nextItem() {
    this.selectedItemIndex.update(index => (index + 1) % this.ItemList.length);
    //** Méthode alternative en deux étapes **//
    //const nextIndex = (this.selectedItemIndex()); 
    //this.selectedItemIndex.set((nextIndex + 1) % 2);
  }
}
