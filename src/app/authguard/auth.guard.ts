import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): boolean {
    const storedUser:any = localStorage.getItem('userId');
    const user = JSON.parse(storedUser)
    if(user){
      this.auth.setUserId(user);
    }
    if (user||this.auth.getAuthStatus()) {
      return true;
    } else {
      return false;
    }
  }
}
