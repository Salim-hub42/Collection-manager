import { Component, ChangeDetectionStrategy, signal, computed, model, inject } from '@angular/core';
import { CollectionItemCard } from './components/collection-item-card/collection-item-card';
import { CollectionItem } from './models/collection-item';
import { SearchBar } from './components/search-bar/search-bar';
import { Collection } from './models/collection';
import { CollectionService } from './services/collection-service';

@Component({
  selector: 'app-root',
  imports: [CollectionItemCard, SearchBar],
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
  private collectionService = inject(CollectionService);

  search = model('');
  selectedCollection = signal<Collection | null>(null);
  collectionItems = computed(() => {
    const allItems = this.selectedCollection()?.items;
    return allItems?.filter(item => item.name.toLowerCase().includes(this.search().toLowerCase()));
  });

  constructor() {
    const allCollections = this.collectionService.getAll();
    if (allCollections.length > 0) {
      this.selectedCollection.set(allCollections[0]);
    }
  }

  addGenericItem() {
    const collection = this.selectedCollection();
    if (collection) {
      const storedCollection = this.collectionService.addItem(collection, new CollectionItem());
      this.selectedCollection.set(storedCollection);
    }
  }
}
