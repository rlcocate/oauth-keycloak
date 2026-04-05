import { Injectable, signal, computed } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private keycloak = new Keycloak({
    url: 'http://localhost:8080',
    realm: 'angular-app',
    clientId: 'angular-client'
  });

  // Signals
  private _isAuthenticated = signal(false);
  private _token = signal<string | null>(null);

  isAuthenticated = computed(() => this._isAuthenticated());
  token = computed(() => this._token());

  async init() {
    const authenticated = await this.keycloak.init({
      onLoad: 'check-sso',
      pkceMethod: 'S256'
    });

    this._isAuthenticated.set(authenticated);
    this._token.set(this.keycloak.token || null);
  }

  login() {
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout();
  }

  async refreshToken() {
    try {
      const refreshed = await this.keycloak.updateToken(30);
      if (refreshed) {
        this._token.set(this.keycloak.token!);
      }
    } catch {
      this.logout();
    }
  }
}