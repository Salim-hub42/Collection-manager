import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CollectionItem } from '../../models/collection-item';

@Component({
  selector: 'app-collection-item-card',
  imports: [],
  templateUrl: './collection-item-card.html',
  styleUrl: './collection-item-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionItemCard {

  item = input.required<CollectionItem>();
  imageClass = input('');


}
