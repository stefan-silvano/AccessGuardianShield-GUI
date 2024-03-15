import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BussinessCodeModel } from './bussiness-code.model';

@Injectable({
  providedIn: 'root'
})
export class BussinessCodeService {

  private apiUrl = 'http://localhost:8080/iam-api/v1/business-codes';

  constructor(private http: HttpClient) {}

  isEdit: boolean = false;

  addBusinessCode(businessCode: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(this.apiUrl, businessCode, httpOptions);
  }

  addBusinessCodes(businessCodes: any[]): Observable<any> {
    const url = `${this.apiUrl}/bulk`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(url, businessCodes, httpOptions);
  }

  getBusinessCode(businessCodeId: number): Observable<BussinessCodeModel> {
    const url = `${this.apiUrl}/${businessCodeId}`;
    return this.http.get<BussinessCodeModel>(url);
  }

  updateBussinessCode(businessCodeId: number, businessCode: any): Observable<any> {
    const url = `${this.apiUrl}/${businessCodeId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.patch<any>(url, businessCode, httpOptions);
  }

  deleteBussinessCode(businessCodeId: number): Observable<any> {
    const url = `${this.apiUrl}/${businessCodeId}`;
    return this.http.delete<any>(url);
  }

  getBusinessCodes(): Observable<BussinessCodeModel[]> {
    return this.http.get<BussinessCodeModel[]>(this.apiUrl);
  }
}
