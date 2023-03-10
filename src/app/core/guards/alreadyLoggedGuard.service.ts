import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, firstValueFrom } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class AlreadyLoggedGuardService {
  constructor(
    private router: Router,
    private loginService: LoginService,
    private cookieService: CookieService  
    ) {}
  teste: boolean = false

  async canActivate(): Promise<boolean | UrlTree | Observable<boolean | UrlTree>> {
    
    const isLoggedin = await firstValueFrom(this.loginService.isLoggedin)
    
    if (isLoggedin) {
      this.router.navigate(['/Examples/LugarSecreto']);
      return false;
    }
    const Cookie = this.cookieService.get("User")
    
    if(Cookie){
      const User = JSON.parse(Cookie)
      if(User && User?.Email && User?.Senha){
        this.router.navigate(['/Examples/LugarSecreto']);
        this.loginService.isLoggedin.next(true)
        return false;
      }
    }
 
    return true;
  }
}