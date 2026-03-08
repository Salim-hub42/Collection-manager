import { Component, inject, input } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';



@Component({
  selector: 'app-collection-item-detail',
  imports: [RouterLinkWithHref],
  templateUrl: './collection-item-detail.html',
  styleUrl: './collection-item-detail.css',
})
export class CollectionItemDetail {
  private readonly activedRoute = inject(ActivatedRoute);// Injection de la classe ActivatedRoute pour accéder aux paramètres de la route actuelle.
  private readonly router = inject(Router);// Injection de la classe Router pour permettre la navigation programmatique entre les routes.
  id = input<number | null, string | null>(null, {
    alias: 'id',
    transform: value => value ? parseInt(value) : null
  }) // Déclaration d'une propriété d'entrée (input) nommée "id" qui peut être de type number ou string, avec une valeur par défaut de null. La transformation convertit la valeur en nombre entier si elle est présente, sinon elle reste null.



}