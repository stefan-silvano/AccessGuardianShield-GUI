import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../../assignment.service';
import { UserPermissionModel } from '../user-permission.model';
import { DatePipe } from '@angular/common';
import { ModalComponent } from 'src/app/dashboard/modal/modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserPermissionViewComponent } from './user-permission-view/user-permission-view.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-permission-list',
  templateUrl: './user-permission-list.component.html',
  styleUrls: ['./user-permission-list.component.css'],
  providers: [DatePipe]
})
export class UserPermissionListComponent implements OnInit {
  userPermissions: any[] = [];
  constructor(
    private assignmentService: AssignmentService,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadUserPermissions();
  }

  loadUserPermissions() {
    this.assignmentService.getUserPermissions().subscribe(
      (response: UserPermissionModel[]) => {
        this.userPermissions = response;
        this.userPermissions.forEach((userPermission: UserPermissionModel) => {
          const formatedStartDate = this.datePipe.transform(
            userPermission.startDate,
            'dd.MM.yyyy'
          );
          const formatedEndDate = this.datePipe.transform(
            userPermission.endDate,
            'dd.MM.yyyy'
          );
          if (formatedStartDate != null) {
            userPermission.startDate = formatedStartDate;
          }
          if (formatedEndDate != null) {
            userPermission.endDate = formatedEndDate;
          }
        });
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  openConfirmationModal(userId: number): void {
    const dialogRef: MatDialogRef<ModalComponent> = this.dialog.open(
      ModalComponent,
      {
        width: '60vh',
        data: 'Do you want to delete this user-permission?',
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.confirmAction(userId);
      } else {
        this.cancelAction();
      }
    });
  }

  openViewModal(userPermission: any): void {
    const dialogRef: MatDialogRef<UserPermissionViewComponent> = this.dialog.open(
      UserPermissionViewComponent,
      {
        width: '60vh',
        data: userPermission,
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        console.log("confirm");
      }
    });
  }

  cancelAction(): void {
    this.loadUserPermissions();
  }

  confirmAction(userPermissionId: number): void {
    this.assignmentService.deleteUserPermission(userPermissionId).subscribe(
      () => {
        console.log("User-permission deleted successfully.");
        this.openSnackBar('User-permission has been successfully deleted')
        this.loadUserPermissions();
      },
      (error: any) => {
        console.error('Error:', error);
        this.openSnackBar('User-permission was not successfully deleted');
      }
    );
  }

  openSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 1250;

    this._snackBar.open(message, undefined, config);
  }
}
