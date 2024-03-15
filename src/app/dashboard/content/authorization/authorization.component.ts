import { Component } from '@angular/core';
import { AuthorizationService } from './authorization.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AuthorizationViewComponent } from './authorization-view/authorization-view.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
  providers: [DatePipe]
})
export class AuthorizationComponent {
  authorizations: any[] = [];

  constructor(
    private authroizationService: AuthorizationService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadAuthorizations();
  }

  loadAuthorizations() {
    this.authroizationService.getAuthorizations().subscribe(
      (response: any[]) => {
        this.authorizations = response;
        this.authorizations.forEach((authorization: any) => {
          const formatedStartDate = this.datePipe.transform(
            authorization.startDate,
            'dd.MM.yyyy'
          );
          const formatedEndDate = this.datePipe.transform(
            authorization.endDate,
            'dd.MM.yyyy'
          );
          if (formatedStartDate != null) {
            authorization.startDate = formatedStartDate;
          }
          if (formatedEndDate != null) {
            authorization.endDate = formatedEndDate;
          }
        });
      },
      (error: any) => {
        console.error('Error:', error);
        this.openSnackBar('No authorization was found')
      }
    );
  }

  openViewModal(authorization: any): void {
    const dialogRef: MatDialogRef<AuthorizationViewComponent> = this.dialog.open(
      AuthorizationViewComponent,
      {
        width: '60vh',
        data: authorization,
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'back') {
        console.log("back");
      }
    });
  }

  openSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 1250;

    this._snackBar.open(message, undefined, config);
  }
}
