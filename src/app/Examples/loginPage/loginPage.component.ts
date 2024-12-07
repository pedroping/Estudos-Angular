import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-loginPage',
  templateUrl: './loginPage.component.html',
  styleUrls: ['./loginPage.component.scss'],
  imports: [FormsModule, ReactiveFormsModule],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private cookieService: CookieService,
  ) {}

  InputType: 'password' | 'text' = 'password';

  LoginForm = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Senha: new FormControl('', Validators.required),
    Checked: new FormControl(false),
  });

  ngOnInit() {}

  get changeTypeInput() {
    if (this.InputType == 'password') {
      return (this.InputType = 'text');
    }
    return (this.InputType = 'password');
  }

  submit() {
    if (this.LoginForm.valid) {
      if (this.LoginForm.value.Checked) {
        this.cookieService.set(
          'User',
          JSON.stringify({
            Email: this.LoginForm.value.Email,
            Senha: this.LoginForm.value.Senha,
          }),
        );
      }
      this.loginService.isLoggedin.next(true);
      this.router.navigate(['/Examples/LugarSecreto']);
    }
  }
}
