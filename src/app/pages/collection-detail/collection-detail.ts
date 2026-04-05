import { Component, inject, model, signal, computed, input, effect } from '@angular/core';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CollectionService } from '../../services/collection/collection-service';
import { CollectionItem } from '../../models/collection-item';
import { Collection } from '../../models/collection';
import { SearchBar } from '../../components/search-bar/search-bar';
import { CollectionItemCard } from '../../components/collection-item-card/collection-item-card';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-collection-detail',
  imports: [SearchBar, CollectionItemCard, MatButtonModule],
  templateUrl: './collection-detail.html',
  styleUrl: './collection-detail.css',
})
export class CollectionDetail {

  private router = inject(Router);
  collectionService = inject(CollectionService);
  search = model('');

  collectionId = input<number | undefined, string | undefined>(undefined, {
    alias: 'id',
    transform: (id: string | undefined) => id ? parseInt(id) : undefined
  });

  selectedCollection$ = toObservable(this.collectionId).pipe(
    takeUntilDestroyed(),
    filter(id => id !== undefined),
    switchMap(id => this.collectionService.get(id)),
    tap(collection => {
      this.selectedCollection.set(collection);
    })
  );

  selectedCollection = signal<Collection | null>(null);
  displayedItems = computed(() => {
    const allItems = this.selectedCollection()?.items || [];
    return allItems.filter(item =>
      item.name.toLowerCase().includes((this.search() || '').toLocaleLowerCase()
      )
    );
  });

  constructor() {
    effect(() => {
      if (!this.collectionId() && this.collectionService.selectedCollection()) {
        this.router.navigate(['collection', this.collectionService.selectedCollection()?.id]);
      }
    })
    this.selectedCollection$.subscribe();
  }

  addItem() {
    this.router.navigate(['item']);
  }



  openItem(item: CollectionItem) {
    this.router.navigate(['item', item.id]);
  }

}