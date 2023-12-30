// home.component.ts
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { isPlatformBrowser } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from '../../app/app.component';
import { ProductService } from '../../Services/merch.service';


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
    private router: Router,
    private dialog: MatDialog,
    private app: AppComponent,
    private productService: ProductService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.userlogged = user;
      this.isLogged = !!user;
    });
  }
  totalQuantity(): number {
    return this.productService.totalQuantity();
  }
  openLoginPopup(): void {
    if (isPlatformBrowser(this.platformId)) {
      const loginPopup = window.open(
        'http://localhost:4200/Login',
        'LoginPopup',
        'width=600,height=600'
      );

      const closePopupHandler = () => {
        document.body.removeChild(overlay);
      };

      const redirectToHome = () => {
        this.router.navigate(['/Home']);
        loginPopup?.close();
        closePopupHandler();
      };

      loginPopup?.addEventListener('beforeunload', closePopupHandler);

      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      overlay.style.zIndex = '9999';
      document.body.appendChild(overlay);

      $("#modal").modal('hide');

      redirectToHome();
    }
  }

  logOut(): void {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }

  log(){const dialogRef = this.dialog.open(LoginComponent,{
    position: {top: '30px'},
    width: '600px'

  });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  cart(){
    this.app.onToggleCart();
  }

}
