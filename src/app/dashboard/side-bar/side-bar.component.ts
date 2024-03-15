import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { LoggedUser } from 'src/app/auth/model/logged-user.model';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  name!: string;
  letters!: string;

  constructor(private authService: AuthService,
    private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const loggedUserEmail = this.authService.getDecodedAuthToken(token).sub;
      this.getUserByEmail(loggedUserEmail);
    }
  }

  getUserByEmail(email: string): void {
    this.authService.getUserByEmail(email).subscribe(
      (response: LoggedUser) => {
        this.letters = response.firstName[0] + response.lastName[0];
        this.name = response.firstName + ' ' + response.lastName;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  logout(){
    this.authService.logout();
    this.openSnackBar('Logout successful');
    console.log('Logout successful');
  }

  menu_assignment = [
    {
      name: 'Assignment',
      icon: 'assignment_turned_in',
      link: 'assignments',
    },
    {
      name: 'Authorization',
      icon: 'gpp_good',
      link: 'authorizations',
    },
  ]

  menu_import_export = [
    {
      name: 'Import',
      icon: 'file_upload',
      link: 'import',
    },
    {
      name: 'Export',
      icon: 'file_download',
      link: 'export',
    },
  ]

  menu_entity = [
    {
      name: 'User',
      icon: 'person',
      link: 'users',
    },
    {
      name: 'Address',
      icon: 'home',
      link: 'addresses',
    },
    {
      name: 'Permission',
      icon: 'key',
      link: 'permissions',
    },
    {
      name: 'Role',
      icon: 'lock',
      link: 'roles',
    },
    {
      name: 'Container',
      icon: 'inventory',
      link: 'containers',
    },
    {
      name: 'Organization',
      icon: 'business',
      link: 'organizations',
    },
    {
      name: 'Business-code',
      icon: 'code',
      link: 'business-codes',
    }
  ];

  openSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 1250;

    this._snackBar.open(message, undefined, config);
  }
}
