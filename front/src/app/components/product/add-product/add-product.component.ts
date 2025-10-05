import { Component } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  product: Product = new Product();

  constructor(private productService: ProductService) { }

  onSubmit() {
    this.saveProduct();
  }

  private saveProduct() {
    if (this.product.description == "" || this.product.name == "" || 
    (this.product.price == 0 || this.product.price == null) || 
    (this.product.stock == 0 || this.product.stock == null)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todos los capos son obligatorios'
      });
      return;
    }
    if (this.product.price < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El precio no puede ser negativo'
      });
      return;
    }
    if (this.product.stock < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La existencia del producto no puede ser negativa'
      });
      return;
    }
    Swal.fire({
      title: '¿Seguro que desea agregar el producto?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.addProduct(this.product).subscribe(
          data => {
            Swal.fire(
              'Guardado',
              'El producto ha sido agregado correctamente',
              'success'
            ).then((result) => {
              if (result.isConfirmed) {
                window.location.href = '/products';
              }
            }
            );
          }
        );
      }
    });
  }

  public clearForm() {
    this.product.description = "";
    this.product.name = "";
    this.product.price = 0;
    this.product.stock = 0;
  }
}
