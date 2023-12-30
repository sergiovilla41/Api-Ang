import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { from, Observable } from 'rxjs';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {

  constructor(private oauthService: OAuthService) {
    if (typeof window !== 'undefined') {
      this.initLogin();
    }
  }

  initLogin() {
    const config: AuthConfig = this.getConfig();
    this.oauthService.configure(config);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login(): void {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  async getProfile(): Promise<Observable<SocialUser>> {
    const identityClaims = await this.oauthService.getIdentityClaims();
    const observableSocialUser = from([identityClaims] as SocialUser[]); // Convertir a un array para que from funcione
    return observableSocialUser;
  }

  isUserLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  private getConfig(): AuthConfig {
    return {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '341708118799-pbmtrucj8tjuj9pobvh7nb50kcebpo0k.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/Home',
      scope: 'openid profile email',
    };
  }
}
