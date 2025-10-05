import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

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
      Swal.fire({
          text: 'Por favor ingresa usuario y contraseña.',
          icon: 'warning',
        });
      return;
    }
    this.authService.login(this.userName, this.password).subscribe({
      next: (response) => {
        this.authService.saveUser(response);
        this.router.navigate(['/products']);
      },
      error: (err) => {
      if (err.status === 401) {
        Swal.fire({
          title: 'Error',
          text: 'Credenciales incorrectas, intenta de nuevo.',
          icon: 'error',
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Error al conectar con el servidor.',
          icon: 'error',
        });
      }
    }
    });
  }
}
