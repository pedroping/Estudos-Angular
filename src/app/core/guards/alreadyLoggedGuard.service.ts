import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class AlreadyLoggedGuardService {
  constructor(
    private router: Router,
    private loginService: LoginService  
    ) {}
  teste: boolean = false

  async canActivate(): Promise<boolean | UrlTree | Observable<boolean | UrlTree>> {
    
    const isLoggedin = await firstValueFrom(this.loginService.isLoggedin)

    const User = JSON.parse(localStorage.getItem("User")!)

    if (isLoggedin) {
      this.router.navigate(['/Examples/LugarSecreto']);
      return false;
    }
    
    if(User && User?.Email && User?.Senha){
      this.router.navigate(['/Examples/LugarSecreto']);
      this.loginService.isLoggedin.next(true)
      return false;
    }

    return true;
  }
}