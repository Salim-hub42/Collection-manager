import { Component, inject, model, signal, computed } from '@angular/core';
import { CollectionService } from '../../services/collection-service';
import { CollectionItem } from '../../models/collection-item';
import { Collection } from '../../models/collection';
import { SearchBar } from '../../components/search-bar/search-bar';
import { CollectionItemCard } from '../../components/collection-item-card/collection-item-card';

@Component({
  selector: 'app-collection-detail',
  imports: [SearchBar, CollectionItemCard],
  templateUrl: './collection-detail.html',
  styleUrl: './collection-detail.css',
})
export class CollectionDetail {

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
