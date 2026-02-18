import { Component, ChangeDetectionStrategy, signal, computed, model } from '@angular/core';
import { CollectionItemCard } from './components/collection-item-card/collection-item-card';
import { CollectionItem } from './models/collection-item';
import { SearchBar } from './components/search-bar/search-bar';
import { Collection } from './models/collection';

@Component({
  selector: 'app-root',
  imports: [CollectionItemCard, SearchBar],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {

  search = model(''); //model est une fonction qui crée une propriété réactive dans un composant Angular. Elle permet de lier une variable à une valeur initiale et de suivre les changements de cette variable au fil du temps. Lorsque la valeur de la variable change, le composant peut réagir en conséquence, par exemple en mettant à jour l'affichage ou en déclenchant d'autres actions.

  soldat!: CollectionItem; //le point d'exclamation après le nom de la variable indique que cette variable est définie, même si elle n'est pas initialisée immédiatement. Cela permet d'éviter les erreurs de compilation liées à l'utilisation de variables non initialisées.
  boubou!: CollectionItem;
  gotrenk!: CollectionItem;

  selectedCollection = signal<Collection | null>(null); //signal est une fonction qui crée une propriété réactive dans un composant Angular. Elle permet de lier une variable à une valeur initiale et de suivre les changements de cette variable au fil du temps. Lorsque la valeur de la variable change, le composant peut réagir en conséquence, par exemple en mettant à jour l'affichage ou en déclenchant d'autres actions.
  collectionItems = computed(() => {
    const allItems = this.selectedCollection()?.items;
    return allItems?.filter(item => item.name.toLowerCase()
      .includes(this.search().toLowerCase()
      ));
  }); //computed est une fonction qui crée une propriété calculée dans un composant Angular. Elle permet de définir une variable qui dépend d'autres variables réactives et qui est automatiquement recalculée lorsque ces variables changent. Dans ce cas, collectionItems est une variable calculée qui retourne les éléments de la collection sélectionnée ou un tableau vide si aucune collection n'est sélectionnée.


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

    this.gotrenk = new CollectionItem();
    this.gotrenk.name = "Gotrenk";
    this.gotrenk.rarity = "Légendaire";
    this.gotrenk.description = "Un gotrenk légendaire, connu pour sa force et sa sagesse.";
    this.gotrenk.price = 500;
    this.gotrenk.image = "img/gotrenk.png";

    const defaultCollection = new Collection();
    defaultCollection.title = "Default Collection";
    defaultCollection.items = [this.soldat, this.boubou, this.gotrenk];

    this.selectedCollection.set(defaultCollection);


  }




}
