import { Component } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  users: User[];
    hasUsers: boolean = false;
    http: any;
  
    constructor(
      private userService: UserService,
      private dialog: MatDialog
    ) {}
  
    ngOnInit() {
      this.getUsers();
    }
  
    private getUsers() {
      this.userService.getUserList().subscribe(
        (data) => {
          this.users = data;
          this.hasUsers = this.users.length > 0;
        },
        (error) => {
          console.error('Error fetching products:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudieron cargar los productos',
          });
        }
      );
    }
  
    editUser(id: number) {
      window.location.href = '/editUser/' + id;
    }
  
    deleteUser(id: number) {
      Swal.fire({
        title: '¿Seguro que desea eliminar el usuario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo',
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteUser(id).subscribe((data: any) => {
            console.log(data);
            this.getUsers();
            Swal.fire('Eliminado', 'El usuario ha sido eliminado', 'success');
          });
        }
      });
    }
  
    // buyProduct(productId: number) {
    //   const prod = this.products.find((p) => p.id === productId);
    //   if (!prod) return;
  
    //   if (this.dialog.openDialogs.length > 0) return;
  
    //   this.dialog
    //     .open(ModalSalesComponent, {
    //       panelClass: 'custom-dialog-container',
    //       disableClose: true,
    //       data: { variable: prod.name, min: 1, max: prod.stock, idProduct: prod.id, name: prod.name },
    //     })
    //     .afterClosed()
    //     .subscribe((cantidad) => {
         
    //       if (typeof cantidad !== 'number') return;
  
    //       //  Actualiza UI localmente
    //       if (cantidad > prod.stock) {
    //         alert(
    //           `No puedes vender ${cantidad}; solo hay ${prod.stock} en stock`
    //         );
    //         return;
    //       }
          
    //       this.getProducts();
          
    //     });
    // }
}
