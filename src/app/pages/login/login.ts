import { Component, inject, signal, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule, MatFormField } from '@angular/material/input';
import { Router } from '@angular/router';
import { LoginCredentialsDTO, LoginService } from '../../services/login/login-service/login-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule, MatFormField, MatInputModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnDestroy {

  private formBuilder = inject(FormBuilder); // Injection du FormBuilder pour créer le formulaire de connexion
  private loginService = inject(LoginService); // Injection du LoginService pour gérer la logique de connexion  
  private router = inject(Router); // Injection du Router pour la navigation après la connexion

  private subcription = new Subscription(); // Subscription pour gérer les abonnements et éviter les fuites de mémoire



  loginFormGroup = this.formBuilder.group({ // Création du groupe de contrôle pour le formulaire de connexion
    'username': ['', [Validators.required]], // Champ de saisie pour le nom d'utilisateur, requis
    'password': ['', [Validators.required]] // Champ de saisie pour le mot de passe, requis
  })

  invalidCredentials = signal(false); // Signal pour indiquer si les informations d'identification sont invalides, initialisé à false


  login() {
    const loginSubscription = this.loginService.login(// Appel de la méthode login du LoginService en passant les valeurs du formulaire de connexion 
      this.loginFormGroup.value as LoginCredentialsDTO// Transformation des valeurs du formulaire en LoginCredentialsDTO
    ).subscribe({// Abonnement à l'observable retourné par la méthode login pour gérer la réponse de la requête de connexion
      next: () => this.getUserInformation(),// En cas de succès de la connexion, récupération des informations de l'utilisateur
      error: () => this.invalidCredentials.set(true)// En cas d'erreur de connexion, mise à jour du signal invalidCredentials pour indiquer que les informations d'identification sont invalides
    });
    this.subcription.add(loginSubscription);// Ajout de l'abonnement à la subscription pour pouvoir le nettoyer lors de la destruction du composant
  }


  getUserInformation() {
    const getUserSubscription = this.loginService.getUser().subscribe(user => {// Appel de la méthode getUser du LoginService pour récupérer les informations de l'utilisateur connecté et abonnement à l'observable retourné pour gérer la réponse
      this.navigateHome(); // Navigation vers la page d'accueil après la récupération des informations de l'utilisateur
    })
    this.subcription.add(getUserSubscription); // Ajout de l'abonnement à la subscription pour pouvoir le nettoyer lors de la destruction du composant
  }



  navigateHome() {
    this.router.navigate(['/']); // Navigation vers la page d'accueil après la connexion réussie
  }


  ngOnDestroy() {
    this.subcription?.unsubscribe();
  }


}




