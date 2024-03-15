import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrganizationModel } from './organization.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private apiUrl = 'http://localhost:8080/iam-api/v1/organizations';

  constructor(private http: HttpClient) {}

  isEdit: boolean = false;

  addOrganization(organization: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(this.apiUrl, organization, httpOptions);
  }

  addOrganizations(organizations: any[]): Observable<any> {
    const url = `${this.apiUrl}/bulk`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(url, organizations, httpOptions);
  }

  getOrganization(userId: number): Observable<OrganizationModel> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<OrganizationModel>(url);
  }

  updateOrganization(organizationId: number, organization: any): Observable<any> {
    const url = `${this.apiUrl}/${organizationId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.patch<any>(url, organization, httpOptions);
  }

  deleteOrganization(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete<any>(url);
  }

  getOrganizations(): Observable<OrganizationModel[]> {
    return this.http.get<OrganizationModel[]>(this.apiUrl);
  }
}
