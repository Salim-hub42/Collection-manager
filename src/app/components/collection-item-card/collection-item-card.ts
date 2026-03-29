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

  navigateToDeyail() {
    this.router.navigate(['item', this.item().id]);
  }

}
