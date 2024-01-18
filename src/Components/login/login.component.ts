import { Component, NgZone, OnInit, ViewContainerRef } from '@angular/core';
import { AuthGoogleService } from '../../Services/authgoogle.service';
import { SocialAuthService, FacebookLoginProvider, SocialUser} from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { AuthServiceServiceUser } from '../../Services/auth-service.service';
import { RegistrationForm } from '../../Interfaces/User.interface';
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
  formData: RegistrationForm = {
    username: '',
    password: '',
    confirmPassword: ''
  };
  constructor(private authGoogleService: AuthGoogleService, private authService: SocialAuthService, private zone: NgZone,
    private ruter : Router,
   private authServiceUser : AuthServiceServiceUser,

    ) {}
    onSubmit(): void {
      // Realiza la lógica de validación aquí si es necesario

      this.authServiceUser.registerUser(this.formData).subscribe(
        (response) => {
          console.log('Usuario registrado con éxito:', response);
          // Puedes redirigir al usuario o realizar otras acciones después del registro
        },
        (error) => {
          console.error('Error al registrar usuario:', error);
          // Manejar errores aquí
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
