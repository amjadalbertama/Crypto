import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.getToken()) {
      // Jika pengguna telah masuk, izinkan pengguna mengakses halaman tersebut
      return true;
    } else {
      // Jika pengguna belum masuk, arahkan pengguna ke halaman login
      this.router.navigate(['/home']);
      return false;
    }
  }
}
