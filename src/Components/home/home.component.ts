import { OAuthService } from 'angular-oauth2-oidc';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from '../../Services/authgoogle.service';
import { AppComponent } from '../../app/app.component';




declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userlogged: SocialUser = new SocialUser();
  isLogged: boolean = false;

  constructor(
    private authService: SocialAuthService,
    private ruter: Router,
    private authGoogleService: AuthGoogleService,
    private app: AppComponent

  ){}
  cart(){
    this.app.onToggleCart();
  }

  ngOnInit(): void {
    this.authService.authState.subscribe(
      data => {
        this.userlogged = data;
        this.isLogged = (this.userlogged != null);

      }    );    }


  logOut(): void {
      this.authService.signOut();
    this.ruter.navigate(['/Home']);
  }

  openLoginPopup(): void {
    // Crear un overlay para oscurecer el fondo
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Fondo oscuro semitransparente
    overlay.style.zIndex = '9999'; // Asegúrate de que el overlay esté por encima de otros elementos
    document.body.appendChild(overlay);

    // Abre la segunda página en una nueva ventana
    const popupWidth = 600;
    const popupHeight = 600;
    const left = (window.innerWidth - popupWidth) / 2;
    const top = (window.innerHeight - popupHeight) / 2;
    const loginPopup = window.open(
      'http://localhost:4200/Login',
      'LoginPopup',
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
    );

    // Almacena la referencia a la ventana emergente en una variable global
    (window as any).loginPopup = loginPopup;

    // Asocia el manejador de eventos para cerrar el overlay cuando se cierre la ventana emergente
    const closePopupHandler = () => {
      // Elimina el overlay al cerrar la ventana emergente
      document.body.removeChild(overlay);
    };

    // Asocia el manejador de eventos para cerrar el overlay cuando se cierre la ventana emergente
    loginPopup?.addEventListener('beforeunload', () => {
      // Cierra la ventana emergente y ejecuta la redirección
      loginPopup?.close();
      redirectToHome();
    });

    // Cierra el modal si estás utilizando Bootstrap modal
    // Asegúrate de tener jQuery y Bootstrap cargados en tu proyecto
    $("#modal").modal('hide');

    // Función para redirigir a la página de inicio
    const redirectToHome = () => {
      window.location.href = '/Home';
      closePopupHandler(); // Cierra el overlay
    };
  }

}


