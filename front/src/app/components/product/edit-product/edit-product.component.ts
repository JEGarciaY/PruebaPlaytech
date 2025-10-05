import { Component } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html'
})
export class EditProductComponent {
  product: Product = new Product();
  id: number;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.productService.getProductById(this.id).subscribe(
      data => {
        this.product = data;
      }, error =>
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un error al cargar el producto'
      })
    );
  }

  onSubmit() {
    this.updateProduct();
  }

  private updateProduct() {
    this.productService.updateProduct(this.id, this.product).subscribe(
      data => {
        console.log(data);
        this.goToProductList();
      }, error => console.log(error));
  }

  private goToProductList() {
    Swal.fire({
      title: '¿Seguro que desea guardar los cambios?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Guardado',
          'El producto ha sido actualizado',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/products';
          }
        }
        );
      }
    }
    );
  }
}
