import { HttpInterceptorFn } from '@angular/common/http';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('TOKEN'); // Récupération du token d'authentification depuis le localStorage
  let requestToSend = req; // Initialisation de la requête à intercepter
  if (token) { // Si un token est présent, on clone la requête en ajoutant le token dans les en-têtes d'autorisation
    const headers = req.headers.set('Authorization', 'Bearer ' + token); // Ajoute un espace après 'Bearer'
    requestToSend = req.clone({ headers }); // Clonage de la requête originale en y ajoutant les nouveaux en-têtes
  }
  return next(requestToSend); // Passage de la requête modifiée (ou originale si pas de token) au prochain intercepteur ou au backend
};
