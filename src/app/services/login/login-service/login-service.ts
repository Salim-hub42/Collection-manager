import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../../models/user';
import { map, tap } from 'rxjs/operators';



export interface LoginCredentialsDTO {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private LK_token = 'TOKEN'; // Clé pour stocker le token d'authentification dans le localStorage
  private http = inject(HttpClient); // Injection du HttpClient pour effectuer des requêtes HTTP
  user = signal<User | null | undefined>(undefined); // Signal pour stocker les informations de l'utilisateur connecté, initialisé à undefined
  private baseUrl = 'http://localhost:3000'; // URL de base pour les requêtes API 

  login(credentials: LoginCredentialsDTO) {// Méthode pour effectuer la connexion de l'utilisateur avec les informations d'identification fournies
    return this.http.post(this.baseUrl + '/login', credentials).pipe(// Utilisation de l'opérateur tap pour effectuer une action secondaire après la réussite de la requête HTTP
      tap((result: any) => {// Stockage du token d'authentification dans le localStorage et mise à jour du signal user avec les informations de l'utilisateur connecté
        localStorage.setItem(this.LK_token, result['token']); // Stockage du token d'authentification dans le localStorage
      })
    );
  }

  getUser() {
    return this.http.get(this.baseUrl + '/me').pipe(// Récupération des informations de l'utilisateur connecté en effectuant une requête GET à l'endpoint /me
      tap((result: any) => {
        const user = Object.assign(new User(), result); // Création d'une instance de User à partir des données récupérées
        this.user.set(user); // Mise à jour du signal user avec les informations de l'utilisateur connecté
      }),
      map(() => this.user()) // Retourne le signal user après la mise à jour
    )
  }

  logout() {
    return this.http.post(this.baseUrl + '/logout', {}).pipe(// Méthode pour effectuer la déconnexion de l'utilisateur en effectuant une requête POST à l'endpoint /logout
      tap(() => {
        localStorage.removeItem(this.LK_token); // Suppression du token d'authentification du localStorage
        this.user.set(null); // Mise à jour du signal user pour indiquer que l'utilisateur est déconnecté
      })
    )
  }















}
