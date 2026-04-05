import { httpResource } from '@angular/common/http';
import { Component, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('oauth-keycloak');
  userResource = httpResource(() => 'https://httpstat.us/401');

  constructor() { 
    this.requestTest();
  }

  requestTest() {
    effect(() => {
      if (this.userResource.value())
        console.log('OK', this.userResource.value());
      if (this.userResource.error())
        console.log('Erro', this.userResource.error());
    });
  }
}