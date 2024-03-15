import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleModel } from './role.model';
import { ContainerModel } from '../container/container.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiUrl = 'http://localhost:8080/iam-api/v1/roles';

  // Temporary
  private apiUrl2 = 'http://localhost:8080/iam-api/v1/containers';

  constructor(private http: HttpClient) {}

  isEdit: boolean = false;

  addRole(role: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(this.apiUrl, role, httpOptions);
  }

  addRoles(roles: any[]): Observable<any> {
    const url = `${this.apiUrl}/bulk`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(url, roles, httpOptions);
  }

  getRole(roleId: number): Observable<RoleModel> {
    const url = `${this.apiUrl}/${roleId}`;
    return this.http.get<RoleModel>(url);
  }

  updateRole(roleId: number, role: any): Observable<any> {
    const url = `${this.apiUrl}/${roleId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.patch<any>(url, role, httpOptions);
  }

  deleteRole(roleId: number): Observable<any> {
    const url = `${this.apiUrl}/${roleId}`;
    return this.http.delete<any>(url);
  }

  getRoles(): Observable<RoleModel[]> {
    return this.http.get<RoleModel[]>(this.apiUrl);
  }

  getContainers(): Observable<ContainerModel[]> {
    return this.http.get<ContainerModel[]>(this.apiUrl2);
  }
}
