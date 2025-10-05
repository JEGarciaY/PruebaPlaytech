import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'inventario-app';
  isLoginPage = false;
  user: any;

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = this.router.url === '/';
        this.loadUser(); // cada vez que navega actualizamos usuario
      }
    });
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.user = this.authService.getUser();
  }

  logout() {
    this.authService.logout();  // borra localStorage
    this.user = null;
    this.router.navigate(['/']);
  }
}
