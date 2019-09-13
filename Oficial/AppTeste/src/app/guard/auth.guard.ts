import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    /*o router  faz parte de um conjunto que gerencia a rota de navegação */
    private router: Router, 
    private authService: AuthService
  ) {}
  
  /*O guard garante q o usuário não entre nas paginas se nao tiver logado */

  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const currentUser = this.authService.isLoggedIn; //verifica no serviço se ta logado
      if (currentUser) {
          // authorised so return true
          return true;
      }
      else{
         // not logged in so redirect to login page with the return url
        this.router.navigate(['/landing']);
        return false;
      }
  }
  
}