import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (!this.userName || !this.password) {
    alert('Por favor ingresa usuario y contraseña.');
    return;
    }
    this.authService.login(this.userName, this.password).subscribe({
      next: (response) => {
        this.authService.saveUser(response);
        this.router.navigate(['/products']);
      },
      error: (err) => {
      if (err.status === 401) {
        alert('Credenciales incorrectas, intenta de nuevo.');
      } else {
        alert('Error al conectar con el servidor');
      }
    }
    });
  }
}
