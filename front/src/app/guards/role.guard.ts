import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Rol requerido para la ruta
    const expectedRoles = route.data['roles'] as string[];

    // Obtener rol actual del usuario desde el token o el AuthService
    const userRole = this.authService.getUserRole();

    if (!userRole) {
      // Si no hay rol
      this.router.navigate(['/']);
      return false;
    }

    // Si el rol no está dentro de los permitidos
    if (!expectedRoles.includes(userRole)) {
      Swal.fire({
        title: 'Error',
        text: 'No cuentas con permisos para realizar esta acción',
        icon: 'error',
      });
      // Redirige al inicio en lugar del login
      this.router.navigate(['/products']);
      return false;
    }
    return true;
  }
}
