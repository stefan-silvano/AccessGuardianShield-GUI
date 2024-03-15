import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContainerModel } from './container.model';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  private apiUrl = 'http://localhost:8080/iam-api/v1/containers';

  constructor(private http: HttpClient) {}

  isEdit: boolean = false;

  addContainer(container: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(this.apiUrl, container, httpOptions);
  }

  addContainers(containers: any[]): Observable<any> {
    const url = `${this.apiUrl}/bulk`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(url, containers, httpOptions);
  }

  getContainer(userId: number): Observable<ContainerModel> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<ContainerModel>(url);
  }

  updateContainer(userId: number, user: any): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.patch<any>(url, user, httpOptions);
  }

  deleteContainer(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete<any>(url);
  }

  getContainers(): Observable<ContainerModel[]> {
    return this.http.get<ContainerModel[]>(this.apiUrl);
  }
}
