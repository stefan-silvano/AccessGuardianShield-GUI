import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../user/user.model';
import { AddressModel } from './address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private apiUrl = 'http://localhost:8080/iam-api/v1/addresses';

  constructor(private http: HttpClient) {}

  isEdit: boolean = false;

  addAddress(address: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(this.apiUrl, address, httpOptions);
  }

  addAddresses(addresses: any[]): Observable<any> {
    const url = `${this.apiUrl}/bulk`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(url, addresses, httpOptions);
  }

  getAddress(addressId: number): Observable<AddressModel> {
    const url = `${this.apiUrl}/${addressId}`;
    return this.http.get<AddressModel>(url);
  }

  updateAddress(addressId: number, address: any): Observable<any> {
    const url = `${this.apiUrl}/${addressId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.patch<any>(url, address, httpOptions);
  }

  deleteAddress(addressId: number): Observable<any> {
    const url = `${this.apiUrl}/${addressId}`;
    return this.http.delete<any>(url);
  }

  getAddresses(): Observable<AddressModel[]> {
    return this.http.get<AddressModel[]>(this.apiUrl);
  }
}
