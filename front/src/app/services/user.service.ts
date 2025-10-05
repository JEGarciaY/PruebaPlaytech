import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlBase = 'http://localhost:8080/users';
  
    constructor(private clientHttp: HttpClient) {}
  
    getUserList(): Observable<User[]> {
      return this.clientHttp.get<User[]>(`${this.urlBase}/allUsers`);
    }
  
    addUser(user: User): Observable<Object> {
      return this.clientHttp.post(`${this.urlBase}/saveUser`, user);
    }
  
    getUserById(id: number): Observable<User> {
      return this.clientHttp.get<User>(`${this.urlBase}/selectUserById/${id}`);
    }
  
    updateUser(id: number, user: User): Observable<Object> {
      return this.clientHttp.put(`${this.urlBase}/updateUser/${id}`, user);
    }
  
    deleteUser(id: number): Observable<Object> {
      return this.clientHttp.delete(`${this.urlBase}/deleteUser/${id}`);
    }
}
