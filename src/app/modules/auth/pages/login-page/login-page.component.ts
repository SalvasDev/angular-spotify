import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  errorSession:boolean = false;

  formLogin:FormGroup = new FormGroup({});

  constructor( private authService: AuthService, private cookie: CookieService, private router:Router ){}

  ngOnInit(): void {
      this.formLogin = new FormGroup(
        {
          email: new FormControl('',
          [
            Validators.required,
            Validators.email
          ]),
          password: new FormControl('',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(12)
          ]),
        }
      )
  }

  sendLogin(): void {
    const { email, password } = this.formLogin.value
    this.authService.sendCredentials( email, password )
      // Esta es la nueva sintaxis para e subscribe
      .subscribe({//TODO: Cuando el usuario ingresa sus credenciales correctas codig menor a 200
        next: (responseOK) => {
          const { tokenSession, data } = responseOK
          this.cookie.set('token', tokenSession, 4,'/');
          this.router.navigate(['/', 'tracks'])

          console.log('sesión iniciada correctamente')
        },
        error: (e) => {
          this.errorSession = true;
          console.log('Ocurrió un error con tu email o password')}
      }
    )
  }


}
