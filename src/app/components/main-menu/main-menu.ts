import { Component, effect, inject } from '@angular/core';
import { LoginService } from '../../services/login/login-service/login-service';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CollectionService } from '../../services/collection/collection-service';


@Component({
  selector: 'app-main-menu',
  imports: [],
  templateUrl: './main-menu.html',
  styleUrl: './main-menu.css',
})
export class MainMenu {

  private readonly LK_SELECTED_COLLECTION = 'selectedCollection'; // Clé utilisée pour stocker la collection sélectionnée dans le localStorage

  private collectionService = inject(CollectionService); // Injection du service de collection pour gérer les collections

  readonly collections = toSignal(this.collectionService.getAll(), { initialValue: [] }); // Signal pour stocker la liste des collections, initialisée avec une valeur vide et mise à jour à partir du service de collection

  readonly selectedCollection = this.collectionService.selectedCollection; //  Signal pour stocker la collection sélectionnée, récupéré depuis le service de collection


  private loginService = inject(LoginService); // Injection du service de connexion pour gérer l'état de l'utilisateur
  private router = inject(Router); // Injection du routeur pour la navigation

  protected user = this.loginService.user; // Signal pour stocker les informations de l'utilisateur connecté, récupéré depuis le service de connexion

  constructor() {
    effect(() => {
      if (this.selectedCollection() || this.collections().length === 0) {// Si une collection est déjà sélectionnée ou si la liste des collections est vide, ne rien faire et retourner
        return;// Cela peut se produire lors du chargement initial de l'application ou si aucune collection n'est disponible
      }

      this.loadSelectedCollection();
    });
  }

  logout() {
    this.loginService.logout().subscribe({
      next: () => this.router.navigate(['login']), // Navigation vers la page de connexion après la déconnexion réussie
      error: (err) => console.error(['login']) // Gestion des erreurs de déconnexion
    });
  }

  select(selectedCollectionId: number) {
    if (selectedCollectionId) {
      localStorage.setItem(this.LK_SELECTED_COLLECTION, String(selectedCollectionId)); // Stockage de l'ID de la collection sélectionnée dans le localStorage pour une utilisation ultérieure
      this.collectionService.get(selectedCollectionId).subscribe(collection => { // Récupération de la collection sélectionnée à partir du service de collection
        this.selectedCollection.set(collection);// Mise à jour du signal de la collection sélectionnée avec la collection récupérée
        this.router.navigate(['collection', collection.id]); // Navigation vers la page de détails de la collection sélectionnée en utilisant son ID
      });
    }
  }

  loadSelectedCollection() {
    const storedCollection = localStorage.getItem(this.LK_SELECTED_COLLECTION); // Récupération de l'ID de la collection sélectionnée à partir du localStorage
    let identifiedCollection = null;

    if (storedCollection) {
      identifiedCollection = this.collections().find(collection => collection.id === parseInt(storedCollection)); // Recherche de la collection correspondante dans la liste des collections en utilisant l'ID récupéré du localStorage
    }

    if (!identifiedCollection) {
      identifiedCollection = this.collections()[0]; // Si aucune collection correspondante n'est trouvée, sélection de la première collection de la liste
    }

    if (!identifiedCollection?.id) {// Si aucune collection n'est identifiée ou si l'ID de la collection identifiée est invalide, ne rien faire et retourner
      return;// Cela peut se produire si la liste des collections est vide ou si l'ID stocké dans le localStorage ne correspond à aucune collection existante
    }

    if (identifiedCollection.id) {
      this.collectionService.get(identifiedCollection.id).subscribe(collection => { // Récupération de la collection identifiée à partir du service de collection
        this.selectedCollection.set(collection); // Mise à jour du signal de la collection sélectionnée avec la collection récupérée
        if (this.router.url === '/collection') {
          this.router.navigate(['collection', collection.id]); // Navigation vers la page de détails de la collection sélectionnée si l'URL actuelle est '/collection'
        }
      });

    }
  }



}

