import { Component, OnInit } from '@angular/core';
import { Buy } from '../../../models/buy';
import { BuyService } from '../../../services/buy.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-buy-list',
  templateUrl: './buy-list.component.html',
  styleUrls: ['./buy-list.component.css']
})
export class BuyListComponent implements OnInit {
  buys: Buy[] = [];
  errorMessage: string = '';

  constructor(private buyService: BuyService) {}

  ngOnInit(): void {
    this.loadBuys();
  }

  loadBuys(): void {
    this.buyService.getAllBuys().subscribe({
      next: (data) => {
        this.buys = data;
      },
      error: (err) => {
        if(err.status == 404){
          this.errorMessage = 'No hay compras realizadas';
        } else {
          this.errorMessage = 'No se pudieron cargar las compras.';
        }
      }
    });
  }

  generatePDF(): void {
    const doc = new jsPDF();

    doc.text('Historial de Compras', 14, 20);

    if (this.buys.length === 0) {
    doc.text('No hay compras registradas.', 14, 40);
    doc.save('historial_compras.pdf');
    return;
  }

    const columns = [
      { header: 'Fecha', dataKey: 'date' },
      { header: 'Producto', dataKey: 'nameProduct' },
      { header: 'Cantidad', dataKey: 'quantity' },
      { header: 'Precio Unitario', dataKey: 'unitPrice' },
      { header: 'Precio Total', dataKey: 'totalPrice' }
    ];

    const rows = this.buys.map(buy => ({
      date: buy.date ? buy.date.split('-').reverse().join('/') : '',
      nameProduct: buy.nameProduct ? buy.nameProduct.toString() : 'null',
      quantity: buy.quantity != null ? buy.quantity : 0,
      unitPrice: buy.unitPrice != null ? `$${buy.unitPrice.toLocaleString()}` : '$0',
      totalPrice: buy.totalPrice != null ? `$${buy.totalPrice.toLocaleString()}` : '$0'
    }));


    autoTable(doc, {
      columns,
      body: rows,
      startY: 30,
      styles: { halign: 'center' },
      headStyles: { fillColor: [40, 167, 69] }
    });

    doc.save('historial_compras.pdf');
  }
}