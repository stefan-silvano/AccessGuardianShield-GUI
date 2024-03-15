import { Component } from '@angular/core';
import { RoleService } from '../role.service';
import { RoleModel } from '../role.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/dashboard/modal/modal.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent {
  roles: RoleModel[] = [];

  constructor(
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadRoles();
  }

  loadRoles() {
    this.roleService.getRoles().subscribe(
      (response: RoleModel[]) => {
        this.roles = response;
      },
      (error: any) => {
        console.error('Error:', error);
        this.openSnackBar('No role was found')
      }
    );
  }

  newRole() {
    this.roleService.isEdit = false;
    this.router.navigate(['../new'], { relativeTo: this.route });
  }

  editRole(userId: number) {
    this.roleService.isEdit = true;
    this.router.navigate(['../edit', userId], { relativeTo: this.route });
  }

  openConfirmationModal(userId: number): void {
    const dialogRef: MatDialogRef<ModalComponent> = this.dialog.open(
      ModalComponent,
      {
        width: '50vh',
        data: 'Do you want to delete this role?',
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
    this.roleService.deleteRole(userId).subscribe(
      () => {
        console.log("Role deleted successfully.");
        this.openSnackBar('Role has been successfully deleted')
        this.loadRoles();
      },
      (error: any) => {
        console.error('Error:', error);
        this.openSnackBar('Role was not successfully deleted')
      }
    );
  }

  openSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 1250;

    this._snackBar.open(message, undefined, config);
  }
}
