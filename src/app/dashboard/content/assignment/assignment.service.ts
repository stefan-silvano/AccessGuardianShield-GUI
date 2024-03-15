import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPermissionModel } from './assignment-list/user-permission.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  isAdd: boolean = false;

  private apiUrlUP = 'http://localhost:8080/iam-api/v1/user-permission';
  private apiUrlUR = 'http://localhost:8080/iam-api/v1/user-role';
  private apiUrlRP = 'http://localhost:8080/iam-api/v1/role-permission';

  constructor(public http: HttpClient) { }

   // User-permission
  addUserPermission(userPermission: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(this.apiUrlUP, userPermission, httpOptions);
  }

  addUserPermissions(userPermissions: any[]): Observable<any> {
    const url = `${this.apiUrlUP}/bulk`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(url, userPermissions, httpOptions);
  }


  getUserPermissions(): Observable<UserPermissionModel[]> {
    return this.http.get<UserPermissionModel[]>(this.apiUrlUP);
  }

  deleteUserPermission(userPermissionId: number): Observable<any> {
    const url = `${this.apiUrlUP}/${userPermissionId}`;
    return this.http.delete<any>(url);
  }

  // User-role
  addUserRole(userRole: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(this.apiUrlUR, userRole, httpOptions);
  }

  addUserRoles(userRoles: any[]): Observable<any> {
    const url = `${this.apiUrlUR}/bulk`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(url, userRoles, httpOptions);
  }

  getUserRoles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlUR);
  }

  deleteUserRole(userRoleId: number): Observable<any> {
    const url = `${this.apiUrlUR}/${userRoleId}`;
    return this.http.delete<any>(url);
  }

  // Role-permission
  addRolePermission(rolePermission: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(this.apiUrlRP, rolePermission, httpOptions);
  }

  addRolePermissions(rolePermission: any[]): Observable<any> {
    const url = `${this.apiUrlRP}/bulk`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(url, rolePermission, httpOptions);
  }

  getRolePermissions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlRP);
  }

  deleteRolePermission(rolePermissionId: number): Observable<any> {
    const url = `${this.apiUrlRP}/${rolePermissionId}`;
    return this.http.delete<any>(url);
  }
}
