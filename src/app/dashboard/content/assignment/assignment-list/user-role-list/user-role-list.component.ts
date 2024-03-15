import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../../assignment.service';
import { UserPermissionModel } from '../user-permission.model';
import { DatePipe } from '@angular/common';
import { ModalComponent } from 'src/app/dashboard/modal/modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserRoleViewComponent } from './user-role-view/user-role-view.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-role-list',
  templateUrl: './user-role-list.component.html',
  styleUrls: ['./user-role-list.component.css'],
  providers: [DatePipe]
})
export class UserRoleListComponent implements OnInit {
  userRoles: any[] = [];
  constructor(
    private assignmentService: AssignmentService,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadUserRoles();
  }

  loadUserRoles() {
    this.assignmentService.getUserRoles().subscribe(
      (response: any[]) => {
        this.userRoles = response;
        this.userRoles.forEach((userRole: any) => {
          const formatedStartDate = this.datePipe.transform(
            userRole.startDate,
            'dd.MM.yyyy'
          );
          const formatedEndDate = this.datePipe.transform(
            userRole.endDate,
            'dd.MM.yyyy'
          );
          if (formatedStartDate != null) {
            userRole.startDate = formatedStartDate;
          }
          if (formatedEndDate != null) {
            userRole.endDate = formatedEndDate;
          }
        });
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  openViewModal(userRole: any): void {
    const dialogRef: MatDialogRef<UserRoleViewComponent> = this.dialog.open(
      UserRoleViewComponent,
      {
        width: '60vh',
        data: userRole,
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        console.log("confirm");
      }
    });
  }

  openConfirmationModal(userRoleId: number): void {
    const dialogRef: MatDialogRef<ModalComponent> = this.dialog.open(
      ModalComponent,
      {
        width: '60vh',
        data: 'Do you want to delete this user-role?',
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.confirmAction(userRoleId);
      } else {
        this.cancelAction();
      }
    });
  }

  cancelAction(): void {
    this.loadUserRoles();
  }

  confirmAction(userRoleId: number): void {
    this.assignmentService.deleteUserRole(userRoleId).subscribe(
      () => {
        console.log("User-role deleted successfully.");
        this.loadUserRoles();
        this.openSnackBar('User-role has been successfully deleted')
      },
      (error: any) => {
        console.error('Error:', error);
        this.openSnackBar('User-role was not successfully deleted');
      }
    );
  }

  openSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 1250;

    this._snackBar.open(message, undefined, config);
  }
}
