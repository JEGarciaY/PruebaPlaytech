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

    const expectedRoles = route.data['roles'] as string[];

    const userRole = this.authService.getUserRole();

    if (!userRole) {
      this.router.navigate(['/']);
      return false;
    }

    if (!expectedRoles.includes(userRole)) {
      Swal.fire({
        title: 'Error',
        text: 'No cuentas con permisos para realizar esta acción',
        icon: 'error',
      });
      this.router.navigate(['/products']);
      return false;
    }
    return true;
  }
}
