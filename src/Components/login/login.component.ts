import { Component, NgZone, OnInit, ViewContainerRef } from '@angular/core';
import { AuthGoogleService } from '../../Services/authgoogle.service';
import { SocialAuthService, FacebookLoginProvider, SocialUser} from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { AuthServiceServiceUser } from '../../Services/auth-service.service';
import { User } from '../../Interfaces/User.interface';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  socialUser: SocialUser = new SocialUser();
  userlogged: SocialUser = new SocialUser();
  isLogged: boolean = false;

  constructor(private authGoogleService: AuthGoogleService, private authService: SocialAuthService, private zone: NgZone,
    private ruter : Router,
   private authServiceUser : AuthServiceServiceUser,

    ) {}
    user: User = {
      username: '',
      password: '',
      firstName: '',
      lastName: ''
    };
    register() {
      this.authServiceUser.register(this.user).subscribe(
        response => {
          console.log('Registro exitoso:', response);
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            console.error('Error durante el registro. Código de estado:', error.status);
            console.error('Mensaje de error:', error.error);
          } else {
            console.error('Error durante el registro:', error);
          }
        }
      );
    }

    ngOnInit(): void {
      this.authService.authState.subscribe((user) => {
        this.userlogged = user;
        this.isLogged = !!user; // Use el operador de doble negación para convertir a booleano

      });
    }


  loginGoogle() {

    this.authGoogleService.login();

  }

  loginFacebook(): void {

    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((data) => {
      this.userlogged = data;
      this.isLogged=true;
      this.ruter.navigate(['/']);

    });
  }

  logOut(): void {
    this.authService.signOut();
  this.ruter.navigate(['/Home']);  // Usar 'ruter' aquí si esa es la variable correcta
}



}
