import { Component, inject, input, signal, effect, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { CollectionItemCard } from '../../components/collection-item-card/collection-item-card';
import { Router } from '@angular/router';
import { CollectionService } from '../../services/collection-service';
import { CollectionItem } from '../../models/collection-item';
import { Collection } from '../../models/collection';
import { Subscription } from 'rxjs';
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
export class CollectionItemDetail implements OnDestroy {

  private fb = inject(FormBuilder);
  public router = inject(Router);
  private CollectionService = inject(CollectionService);

  itemId = input<number | null, string | null>(null, {
    alias: 'id',
    transform: ((id: string | null) => id ? parseInt(id) : null)

  });

  selectedCollection!: Collection;
  collectionItem = signal<CollectionItem>(new CollectionItem());

  valueChangeSubcription: Subscription | null = null;

  itemFormGroup = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    image: ['', [Validators.required]],
    rarity: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0)]],
  });

  constructor() {
    effect(() => { // effect ici pour réagir au changement de itemId
      let itemToDisplay = new CollectionItem();
      this.selectedCollection = this.CollectionService.getAll()[0];
      if (this.itemId()) {
        const itemFound = this.selectedCollection.items.find(item => item.id === this.itemId());
        if (itemFound) {
          itemToDisplay = itemFound;
        } else {
          this.router.navigate(['not-found']);
        }
      }
      this.itemFormGroup.patchValue(itemToDisplay);// patchValue pour mettre à jour le formulaire avec les données de l'item trouvé ou un nouvel item si pas d'id fourni
    });
    this.valueChangeSubcription = this.itemFormGroup.valueChanges.subscribe(
      () => {
        this.collectionItem.set(
          Object.assign(new CollectionItem(), this.itemFormGroup.value)
        )
      })
  }

  rarities() {
    return ["Common", "Uncommon", "Rare", "Epic", "Legendary"];
  }

  submit(event: Event) {
    event?.preventDefault();
    console.log(this.itemFormGroup.value);

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
    if (this.selectedCollection && this.itemId()) {
      this.CollectionService.deleteItem(this.selectedCollection.id, this.itemId()!);
      this.router.navigate(['/home']); // Redirige après suppression
    }
  }

  addItem() {
    if (this.selectedCollection) {
      const newItem = this.collectionItem();
      this.CollectionService.addItem(this.selectedCollection, newItem);
      this.router.navigate(['/home']); // Redirige après ajout
    }
  }

  ngOnDestroy() {
    this.valueChangeSubcription?.unsubscribe();
  }



}