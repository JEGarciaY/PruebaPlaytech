import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Buy } from '../models/buy';

@Injectable({
  providedIn: 'root'
})
export class BuyService {
  private urlBase = 'http://localhost:8080/buys';

  constructor(private clientHttp: HttpClient) {}

  getAllBuys(): Observable<Buy[]> {
    return this.clientHttp.get<Buy[]>(`${this.urlBase}/allBuys`);
  }

  saveBuyProduct(idProduct: number, cantidad: number): Observable<Object> {
    return this.clientHttp.post(
      `${this.urlBase}/saveBuy?idProduct=${idProduct}&quantity=${cantidad}`,
      {},
    );
  }
}
