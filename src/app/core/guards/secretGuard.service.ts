import { Injectable, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthGuardService {
  constructor(
    private router: Router,
    private loginService: LoginService,
  ) {}
  teste: boolean = false;

  async canActivate(): Promise<
    boolean | UrlTree | Observable<boolean | UrlTree>
  > {
    const isLoggedin = await firstValueFrom(this.loginService.isLoggedin);

    if (!isLoggedin) {
      this.router.navigate(['/Examples/login']);
      return false;
    }
    return true;
  }
}

export const canActivate = async () => {
  const loginService = inject(LoginService);
  const route = inject(Router);

  const isLoggedin = await firstValueFrom(loginService.isLoggedin);

  if (!isLoggedin) {
    route.navigate(['/Examples/login']);
    return false;
  }
  return true;
};
