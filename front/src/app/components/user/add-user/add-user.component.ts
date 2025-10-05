import { Component } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  user: User = new User();
  
    constructor(private userService: UserService) { }
  
    onSubmit() {
      this.saveUser();
    }
  
    private saveUser() {
      if (this.user.userName == "" || this.user.userName == null || 
      (this.user.role == "" || this.user.role == null) || 
      (this.user.password == "" || this.user.password == null)) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Todos los capos son obligatorios'
        });
        return;
      }
      Swal.fire({
        title: '¿Seguro que desea agregar el usuario?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.addUser(this.user).subscribe({
            next: data => {
              console.log(data)
              Swal.fire(
                'Guardado',
                'El usuario ha sido agregado correctamente',
                'success'
              ).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = '/users';
                }
              }
              );
            },
            error: (error) => {
              if(error.status){
                Swal.fire({
                  title: 'Error',
                  text: 'Usuario ' + this.user.userName + ' ya registrado',
                  icon: 'error',
                });
              } else {
                Swal.fire({
                  title: 'Error',
                  text: 'Error inesperado.',
                  icon: 'error',
                });
              }
            }
          });
        }
      });
    }
  
    public clearForm() {
      this.user.userName = "";
      this.user.role = "";
      this.user.password = "";
    }
}
