import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../../assignment.service';
import { UserPermissionModel } from '../user-permission.model';
import { DatePipe } from '@angular/common';
import { ModalComponent } from 'src/app/dashboard/modal/modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RolePermissionViewComponent } from './role-permission-view/role-permission-view.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-role-permission-list',
  templateUrl: './role-permission-list.component.html',
  styleUrls: ['./role-permission-list.component.css'],
  providers: [DatePipe]
})
export class RolePermissionListComponent implements OnInit {
  rolePermissions: any[] = [];
  constructor(
    private assignmentService: AssignmentService,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadRolePermissions();
  }

  loadRolePermissions() {
    this.assignmentService.getRolePermissions().subscribe(
      (response: any[]) => {
        this.rolePermissions = response;
        this.rolePermissions.forEach((rolePermission: any) => {
          const formatedStartDate = this.datePipe.transform(
            rolePermission.startDate,
            'dd.MM.yyyy'
          );
          const formatedEndDate = this.datePipe.transform(
            rolePermission.endDate,
            'dd.MM.yyyy'
          );
          if (formatedStartDate != null) {
            rolePermission.startDate = formatedStartDate;
          }
          if (formatedEndDate != null) {
            rolePermission.endDate = formatedEndDate;
          }
        });
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  openViewModal(rolePermission: any): void {
    const dialogRef: MatDialogRef<RolePermissionViewComponent> = this.dialog.open(
      RolePermissionViewComponent,
      {
        width: '60vh',
        data: rolePermission,
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        console.log("confirm");
      }
    });
  }

  openConfirmationModal(rolePermissionId: number): void {
    const dialogRef: MatDialogRef<ModalComponent> = this.dialog.open(
      ModalComponent,
      {
        width: '60vh',
        data: 'Do you want to delete this role-permission?',
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.confirmAction(rolePermissionId);
      } else {
        this.cancelAction();
      }
    });
  }

  cancelAction(): void {
    this.loadRolePermissions();
  }

  confirmAction(rolePermissionId: number): void {
    this.assignmentService.deleteRolePermission(rolePermissionId).subscribe(
      () => {
        console.log("Role-permission deleted successfully.");
        this.openSnackBar('Role-permission has been successfully deleted')
        this.loadRolePermissions();
      },
      (error: any) => {
        console.error('Error:', error);
        this.openSnackBar('Role-permission was not successfully deleted');
      }
    );
  }

  openSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 1250;

    this._snackBar.open(message, undefined, config);
  }
}
