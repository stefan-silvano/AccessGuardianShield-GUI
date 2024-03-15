import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { AuthRegisterModel } from './model/auth-register.model';
import { AuthLoginModel } from './model/auth-login.model';

import jwt_decode from 'jwt-decode';
import { LoggedUser } from './model/logged-user.model';
import { Router } from '@angular/router';
import { AssignmentService } from '../dashboard/content/assignment/assignment.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/iam-api/v1/auth/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private assignmentService: AssignmentService
  ) {}

  login(req: AuthLoginModel): Observable<any> {
    return this.http.post(this.apiUrl + 'login', req).pipe(
      tap((response: any) => {
        const token = response.token;
        localStorage.setItem('token', token);
        this.autoLogout();
      })
    );
  }

  register(req: AuthRegisterModel): Observable<any> {
    return this.http.post(this.apiUrl + 'register', req).pipe(
      tap((response: any) => {
        const token = response.token;
        localStorage.setItem('token', token);
        this.autoLogout();
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }

  autoLogin() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.getDecodedAuthToken(token);
      const email = decodedToken.sub;
      const exp = decodedToken.exp * 1000;
      const currentTime = Date.now();
      if (exp < currentTime) {
        localStorage.removeItem('token');
        console.log('Auto login fail. Token has expired');
        return of(null);
      }
      return this.getUserByEmail(email).pipe(
        tap(() => {
          console.log('Auto login successful');
        }),
        catchError(() => {
          return of(null);
        })
      );
    } else {
      return of(null);
    }
  }

  autoLogout() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.getDecodedAuthToken(token);
      const expirationTime = decodedToken.exp * 1000;
      if (expirationTime) {
        const currentTime = Date.now();
        if (currentTime >= expirationTime) {
          this.logout();
          console.log('Auto logout succeful. Token has expired.');
        } else {
          const timeUntilExpiration = expirationTime - currentTime;
          console.log('Time until expiration:', timeUntilExpiration);
          setTimeout(() => {
            console.log('Auto logout successful. Token has expired. ');
            this.logout();
          }, timeUntilExpiration);
        }
      }
    }
  }

  getLoggedUser(): Observable<LoggedUser> {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.getDecodedAuthToken(token);
      const email = decodedToken.sub;

      return this.getUserByEmail(email);
    }
    return new Observable<LoggedUser>();
  }

  getUserByEmail(email: string): Observable<LoggedUser> {
    const url = `http://localhost:8080/iam-api/v1/users/byEmail/${email}`;
    return this.http.get<LoggedUser>(url);
  }

  getAuthToken(): Observable<string | null> {
    const token = localStorage.getItem('token');
    return of(token);
  }

  getDecodedAuthToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (err) {
      return err;
    }
  }

  isAdmin() {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = this.getDecodedAuthToken(token);
        const email = decodedToken.sub;
        let isAdmin = false;
        this.getUserByEmail(email).subscribe(
          (loggedUser: any) => {
            this.assignmentService.getUserRoles().subscribe(
              (userRoles: any[]) => {
                userRoles.forEach((userRole) => {
                  if (userRole.user.id === loggedUser.id && userRole.role.name === 'Administrator') {
                    isAdmin = true;
                  }
                });
                resolve(isAdmin); // Resolve the promise with isAdmin value
              },
              (error: any) => {
                console.error('Error:', error);
                reject(error); // Reject the promise with the error
              }
            );
          },
          (error: any) => {
            console.error('Error:', error);
            reject(error); // Reject the promise with the error
          }
        );
      } else {
        resolve(false); // Resolve with false if there is no token
      }
    });
  }


}
