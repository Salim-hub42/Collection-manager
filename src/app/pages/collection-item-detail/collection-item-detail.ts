import { Component, inject, input, signal, linkedSignal } from '@angular/core';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { CollectionItemCard } from '../../components/collection-item-card/collection-item-card';
import { Router } from '@angular/router';
import { CollectionService } from '../../services/collection/collection-service';
import { CollectionItemService } from '../../services/collection-item/collection-item-service';
import { CollectionItem } from '../../models/collection-item';
import { EMPTY, catchError, filter, switchMap, tap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';







@Component({
  selector: 'app-collection-item-detail',
  imports: [ReactiveFormsModule, CollectionItemCard, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './collection-item-detail.html',
  styleUrls: ['./collection-item-detail.css'],
})
export class CollectionItemDetail {

  private fb = inject(FormBuilder);
  public router = inject(Router);
  private collectionService = inject(CollectionService);
  private collectionItemService = inject(CollectionItemService);

  itemId = input<number | null, string | null>(null, {
    alias: 'id',
    transform: (id: string | null) => {
      if (!id) {
        return null;
      }

      const parsedId = Number.parseInt(id, 10);
      return Number.isFinite(parsedId) ? parsedId : null;
    }

  });

  selectedCollection = linkedSignal(() => this.collectionService.selectedCollection());


  collectionItem$ = toObservable(this.itemId).pipe(
    takeUntilDestroyed(),
    filter((itemId): itemId is number => itemId !== null && itemId > 0),
    switchMap(itemId => this.collectionItemService.get(itemId)),
    catchError(() => {
      this.cancel();
      return EMPTY;
    }),
    tap(item => {
      this.collectionItem.set(item);
      this.itemFormGroup.patchValue(item);
    })
  );

  itemCollection$ = this.collectionItem$.pipe(
    takeUntilDestroyed(),
    filter(item => Number.isFinite(item.collectionId) && item.collectionId > 0),
    switchMap(item => this.collectionService.get(item.collectionId)),
    catchError(() => {
      this.cancel();
      return EMPTY;
    }),
    tap(collection => {
      this.selectedCollection.set(collection);
    })
  )

  collectionItem = signal<CollectionItem>(new CollectionItem());
  itemFormGroup = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    image: ['', [Validators.required]],
    rarity: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0)]],
  });

  formValueChanges$ = this.itemFormGroup.valueChanges.pipe(
    takeUntilDestroyed(),
    tap(formValue => {
      this.collectionItem.set(
        Object.assign(new CollectionItem(), {
          ...this.itemFormGroup.value,
          id: this.itemId(),
          collectionId: this.selectedCollection()?.id
        })
      );
    })
  );


  constructor() {
    this.collectionItem$.subscribe();
    this.itemCollection$.subscribe();
    this.formValueChanges$.subscribe();
  }

  Rarity() {
    return ["Common", "Uncommon", "Rare", "Epic", "Legendary"];
  }

  submit(event: Event) {
    event?.preventDefault();
    const item = this.collectionItem();
    const saveObservable = item.id
      ? this.collectionItemService.update(item)
      : this.collectionItemService.add(item);

    saveObservable.subscribe(() => {
      this.cancel();
    });

  }

  isFieldValid(fieldName: string) {
    const formControl = this.itemFormGroup.get(fieldName);
    return formControl?.invalid && (formControl?.dirty || formControl?.touched);
  }

  onFieldChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.itemFormGroup.patchValue({
          image: reader.result as string
        });
      };
    }
  }


  deleteItem() {
    const item = this.collectionItem();

    if (item.id) {
      this.collectionItemService.delete(item).subscribe(() => {
        this.cancel();
      });
    }
  }

  addItem() {
    if (this.selectedCollection()) {
      this.router.navigate(['item']);
    }
  }


  cancel() {
    const collectionId = this.selectedCollection()?.id;

    if (collectionId) {
      this.router.navigate(['collection', collectionId]);
      return;
    }

    this.router.navigate(['collection']);
  }



}