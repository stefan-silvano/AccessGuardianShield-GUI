import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private apiUrl = 'http://localhost:8080/iam-api/v1/authorizations';

  constructor(private http: HttpClient) { }

  getAuthorizations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
