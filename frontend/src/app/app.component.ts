import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router){}
  title = 'SolesApp';
  isHome() {
    return this.router.url === '/home';
  }
  isProfil() {
    return this.router.url === '/profil';
  }
  isInShoes() {
    return this.router.url === '/shoes';
  }
}

