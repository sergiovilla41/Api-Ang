
import { JeweleryComponent } from './../Components/jewelery/jewelery.component';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ProductService } from './../Services/merch.service';
import { CommonModule } from '@angular/common';
import { ClothesComponent } from '../Components/clothes/clothes.component';
import { ElectronicsComponent} from '../Components/electronics/electronics.component';
import { HomeComponent } from '../Components/home/home.component'
import { LoginComponent} from '../Components/login/login.component';
import { OAuthModule, provideOAuthClient } from 'angular-oauth2-oidc';
import { AuthGoogleService } from '../Services/authgoogle.service';
import { FacebookLoginProvider, GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthService, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartComponent } from '../Components/cart/cart.component';
import { TreeModule } from 'primeng/tree';

@NgModule({
  declarations: [
    AppComponent,CartComponent,LoginComponent,HomeComponent,ElectronicsComponent,ClothesComponent,JeweleryComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,CommonModule,OAuthModule.forRoot(),FontAwesomeModule,RouterModule.forRoot([]), BrowserAnimationsModule,SocialLoginModule,GoogleSigninButtonModule,GoogleSigninButtonModule,TreeModule

  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
                   {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1037212057516546')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    provideClientHydration(),SocialLoginModule,
    AuthGoogleService,ProductService,HttpClient,HttpClientModule,provideHttpClient(),provideOAuthClient()
    ,provideHttpClient(withFetch()),SocialAuthService
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
