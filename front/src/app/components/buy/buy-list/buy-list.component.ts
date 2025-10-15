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
  selectedDate: string = '';

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
        if (err.status === 404) {
          this.errorMessage = 'No hay compras realizadas';
        } else {
          this.errorMessage = 'No se pudieron cargar las compras.';
        }
      }
    });
  }

  generatePDF(): void {
    if (!this.selectedDate) {
      alert('Por favor seleccione una fecha antes de generar el PDF.');
      return;
    }

    const dateInput = this.selectedDate;
    const comprasFiltradas = this.buys.filter(buy => buy.date === dateInput);

    const doc = new jsPDF();
    doc.text('Historial de Compras', 14, 20);
    doc.text(`Fecha: ${dateInput}`, 14, 28);

    if (comprasFiltradas.length === 0) {
      doc.text('No hay compras registradas en esa fecha.', 14, 40);
      doc.save(`historial_compras_${dateInput}.pdf`);
      return;
    }

    const cantidadTransacciones = comprasFiltradas.length;
    doc.text(`Cantidad de transacciones: ${cantidadTransacciones}`, 14, 36);

    const columns = [
      { header: 'Fecha', dataKey: 'date' },
      { header: 'Producto', dataKey: 'nameProduct' },
      { header: 'Cantidad', dataKey: 'quantity' },
      { header: 'Precio Unitario', dataKey: 'unitPrice' },
      { header: 'Precio Total', dataKey: 'totalPrice' }
    ];

    const rows = comprasFiltradas.map(buy => ({
      date: buy.date,
      nameProduct: buy.nameProduct ? buy.nameProduct.toString() : 'null',
      quantity: buy.quantity != null ? buy.quantity : 0,
      unitPrice: buy.unitPrice != null ? `$${buy.unitPrice.toLocaleString()}` : '$0',
      totalPrice: buy.totalPrice != null ? buy.totalPrice : 0
    }));

    const totalGeneral = rows.reduce((acc, curr) => acc + curr.totalPrice, 0);

    const totalRow = {
      date: '',
      nameProduct: '',
      quantity: 0,
      unitPrice: 'TOTAL',
      totalPrice: `$${totalGeneral.toLocaleString()}`
    };

    const formattedRows = rows.map(r => ({
      ...r,
      totalPrice: `$${r.totalPrice.toLocaleString()}`
    }));

    formattedRows.push(totalRow);

    autoTable(doc, {
      columns,
      body: formattedRows,
      startY: 44,
      styles: { halign: 'center' },
      headStyles: { fillColor: [40, 167, 69] },
    });

    const resumenProductos: { [key: string]: number } = {};

    comprasFiltradas.forEach(buy => {
      const nombre: string = String(buy.nameProduct || 'Desconocido');
      resumenProductos[nombre] = (resumenProductos[nombre] || 0) + (buy.quantity || 0);
    });

    const productosRows = Object.keys(resumenProductos).map(nombre => ({
      producto: nombre,
      cantidad: resumenProductos[nombre]
    }));

    const finalY = (doc as any).lastAutoTable.finalY + 10;

    doc.text('Resumen de productos vendidos:', 14, finalY + 10);

    autoTable(doc, {
      startY: finalY + 15,
      columns: [
        { header: 'Producto', dataKey: 'producto' },
        { header: 'Cantidad Vendida', dataKey: 'cantidad' }
      ],
      body: productosRows,
      styles: { halign: 'center' },
      headStyles: { fillColor: [52, 73, 94] },
    });

    doc.save(`historial_compras_${dateInput}.pdf`);
  }
}
