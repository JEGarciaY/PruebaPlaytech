import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { BuyService } from '../../../services/buy.service';

export interface ModalSalesData {
  variable: string;
  initial?: number;
  min?: number;
  max?: number;
  idProduct?: number;
  name?: string;
  price?: number;
}

@Component({
  selector: 'app-modal-sales',
  templateUrl: './modal-sales.component.html',
  styleUrls: ['./modal-sales.component.css'],
})
export class ModalSalesComponent {
  form = this.fb.group({
    cantidad: [
      this.data.initial ?? 1,
      [
        Validators.required,
        Validators.min(this.data.min ?? 1),
        ...(this.data.max ? [Validators.max(this.data.max)] : []),
      ],
    ],
  });

  router: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalSalesComponent, number>,
    private service: BuyService,
    @Inject(MAT_DIALOG_DATA) public data: ModalSalesData
  ) {}

  cancelar() {
    this.dialogRef.close(); // undefined => cancelado
  }

  vender() {
    const { idProduct } = this.data;

    if (!idProduct) {
      console.error('ID del producto no proporcionado');
      return;
    }

    if (this.form.valid) {
      const cantidad = this.form.value.cantidad!;
      const producto = this.data.name;
      const precioUnitario = this.data.price ?? 0;
      const total = precioUnitario * cantidad;

      Swal.fire({
        title: `¿Seguro que desea vender ${cantidad} unidades de ${producto}?`,
        html: `
          <strong>Precio unitario:</strong> $${precioUnitario.toLocaleString()} <br>
          <strong>Total:</strong> $${total.toLocaleString()}
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, vender',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.saveBuyProduct(idProduct, cantidad).subscribe({
            next: (response) => {
              Swal.fire({
                title: 'Venta exitosa',
                html: `
                  Se han vendido ${cantidad} unidades de <b>${producto}</b>.<br>
                  <strong>Total recibido:</strong> $${total.toLocaleString()}
                `,
                icon: 'success',
              }).then(() => {
                this.dialogRef.close(cantidad);
                this.router.navigate(['/products']); // Redirige al listado
              });
            },
            error: (error) => {
              Swal.fire({
                title: 'Error',
                text: 'No se pudo completar la venta.',
                icon: 'error',
              });
            },
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.dialogRef.close();
          this.router.navigate(['/products']);
        }
      });
    }
  }
}
