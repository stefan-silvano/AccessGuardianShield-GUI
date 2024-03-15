import { Component } from '@angular/core';
import { PermissionModel } from '../permission.model';
import { PermissionService } from '../permission.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/dashboard/modal/modal.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.css']
})
export class PermissionListComponent {
  permissions: PermissionModel[] = [];

  constructor(
    private permissionService: PermissionService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadPermissions();
  }

  loadPermissions() {
    this.permissionService.getPermissions().subscribe(
      (response: PermissionModel[]) => {
        this.permissions = response;
      },
      (error: any) => {
        console.error('Error:', error);
        this.openSnackBar('No permission was found')
      }
    );
  }

  newPermission() {
    this.permissionService.isEdit = false;
    this.router.navigate(['../new'], { relativeTo: this.route });
  }

  editPermission(userId: number) {
    this.permissionService.isEdit = true;
    this.router.navigate(['../edit', userId], { relativeTo: this.route });
  }

  openConfirmationModal(userId: number): void {
    const dialogRef: MatDialogRef<ModalComponent> = this.dialog.open(
      ModalComponent,
      {
        width: '50vh',
        data: 'Do you want to delete this permission?',
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

  cancelAction(): void {

  }

  confirmAction(userId: number): void {
    this.permissionService.deletePermission(userId).subscribe(
      () => {
        console.log("Permission deleted successfully.");
        this.openSnackBar('Permission has been successfully deleted')
        this.loadPermissions();
      },
      (error: any) => {
        this.openSnackBar(error)
        this.openSnackBar('Permission was not successfully deleted')
      }
    );
  }

  openSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 1250;

    this._snackBar.open(message, undefined, config);
  }

}
