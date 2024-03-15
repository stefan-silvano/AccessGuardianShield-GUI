import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth.service';
import { LoggedUser } from 'src/app/auth/model/logged-user.model';

@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.css'],
})
export class HomeNavComponent implements OnInit {
  @Input() searchTerm: string = '';
  @Output() searchEvent = new EventEmitter<string>();

  loggedUser: LoggedUser | undefined;

  search() {
    this.searchEvent.emit(this.searchTerm);
  }

  constructor(private authService: AuthService, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getLoggedUser();
  }

  getLoggedUser() {
    this.authService.getLoggedUser()
      .subscribe((loggedUser: LoggedUser) => {
        this.loggedUser = loggedUser;
      }, (error: any) => {
        console.error(error);
      });
  }

  logout() {
    this.authService.logout();
    this.openSnackBar('Logout successful')
    console.log('Logout successful');
  }

  openSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 1250;

    this._snackBar.open(message, undefined, config);
  }
}
