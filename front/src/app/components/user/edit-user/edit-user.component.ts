import { UserService } from './../../../services/user.service';
import { Component } from '@angular/core';
import { User } from '../../../models/user';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  user: User = new User();
    id: number;
  
    constructor(private userService: UserService, private route: ActivatedRoute) { }
  
    ngOnInit() {
      this.id = this.route.snapshot.params['id'];
      this.userService.getUserById(this.id).subscribe(
        data => {
          this.user = data;
        }, error =>
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido un error al cargar el producto'
        })
      );
    }
  
    onSubmit() {
      this.updateUser();
    }
  
    private updateUser() {
      this.userService.updateUser(this.id, this.user).subscribe(
        data => {
          console.log(data);
          this.goToUserList();
        }, error => console.log(error));
    }
  
    private goToUserList() {
      Swal.fire({
        title: '¿Seguro que desea guardar los cambios?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Guardado',
            'El usuario ha sido actualizado',
            'success'
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '/users';
            }
          }
          );
        }
      }
      );
    }
}
