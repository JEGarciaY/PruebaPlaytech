import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import {
  ModalSalesComponent,
} from '../../buy/modal-sales/modal-sales.component';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../../models/user';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  products: Product[];
  hasProducts: boolean = false;
  http: any;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  private getProducts() {
    this.productService.getProductList().subscribe(
      (data) => {
        this.products = data;
        this.hasProducts = this.products.length > 0;
      },
      (error) => {
        this.products = [];  
        this.hasProducts = false;
        if(error.status != 404){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudieron cargar los productos',
          });
        }
      }
    );
  }

  editProduct(id: number) {
    const role = this.authService.getUserRole();
      if (role !== 'Administrador') {
        Swal.fire({
          title: 'Error',
          text: 'No cuentas con permisos para realizar esta acción',
          icon: 'error',
        });
        return;
      }
    window.location.href = '/editProduct/' + id;
  }

  addProduct(){
    const role = this.authService.getUserRole();
      if (role !== 'Administrador') {
        Swal.fire({
          title: 'Error',
          text: 'No cuentas con permisos para realizar esta acción',
          icon: 'error',
        });
        return;
      }
    window.location.href = '/addProduct';
  }

  deleteProduct(id: number) {
    const role = this.authService.getUserRole();
      if (role !== 'Administrador') {
        Swal.fire({
          title: 'Error',
          text: 'No cuentas con permisos para realizar esta acción',
          icon: 'error',
        });
        return;
      }
    Swal.fire({
      title: '¿Seguro que desea eliminar el producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe((data) => {
          console.log(data);
          this.getProducts();
          Swal.fire('Eliminado', 'El producto ha sido eliminado', 'success');
        });
      }
    });
  }

  buyProduct(productId: number) {
    const prod = this.products.find((p) => p.id === productId);
    if (!prod) return;

    if (this.dialog.openDialogs.length > 0) return;

    this.dialog
      .open(ModalSalesComponent, {
        panelClass: 'custom-dialog-container',
        width: '55%',
        disableClose: true,
        position: { top: '30vh', left: '-10vh' }, 
        data: { variable: prod.name, min: 1, max: prod.stock, idProduct: prod.id, name: prod.name, price: prod.price },
      })
      .afterClosed()
      .subscribe((cantidad) => {
       
        if (typeof cantidad !== 'number') return;

        //  Actualiza UI localmente
        if (cantidad > prod.stock) {
          alert(
            `No puedes vender ${cantidad}; solo hay ${prod.stock} en stock`
          );
          return;
        }
        
        this.getProducts();
        
      });
  }
}
