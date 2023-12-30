import { Component, NgZone, OnInit, ViewContainerRef } from '@angular/core';
import { AuthGoogleService } from '../../Services/authgoogle.service';
import { SocialAuthService, FacebookLoginProvider, SocialUser} from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';


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

    ) {}

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
