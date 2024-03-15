import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PermissionModel } from './permission.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private apiUrl = 'http://localhost:8080/iam-api/v1/permissions';

  constructor(private http: HttpClient) {}

  isEdit: boolean = false;

  addPermission(permission: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(this.apiUrl, permission, httpOptions);
  }

  addPermissions(permissions: any[]): Observable<any> {
    const url = `${this.apiUrl}/bulk`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(url, permissions, httpOptions);
  }

  getPermission(permissionId: number): Observable<PermissionModel> {
    const url = `${this.apiUrl}/${permissionId}`;
    return this.http.get<PermissionModel>(url);
  }

  updatePermission(permissionId: number, permission: any): Observable<any> {
    const url = `${this.apiUrl}/${permissionId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.patch<any>(url, permission, httpOptions);
  }

  deletePermission(permissionId: number): Observable<any> {
    const url = `${this.apiUrl}/${permissionId}`;
    return this.http.delete<any>(url);
  }

  getPermissions(): Observable<PermissionModel[]> {
    return this.http.get<PermissionModel[]>(this.apiUrl);
  }
}
