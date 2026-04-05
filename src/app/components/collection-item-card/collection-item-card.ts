import { Component, input, ChangeDetectionStrategy, inject } from '@angular/core';
import { CollectionItem } from '../../models/collection-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collection-item-card',
  imports: [],
  templateUrl: './collection-item-card.html',
  styleUrl: './collection-item-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionItemCard {

  private router = inject(Router);

  item = input.required<CollectionItem>();
  imageClass = input('');

  navigateToDetail() {
    const itemId = this.item().id;

    if (!Number.isFinite(itemId) || itemId <= 0) { // Vérification de la validité de l'ID de l'item avant de tenter la navigation
      return;
    }

    this.router.navigate(['item', itemId]);
  }

}
