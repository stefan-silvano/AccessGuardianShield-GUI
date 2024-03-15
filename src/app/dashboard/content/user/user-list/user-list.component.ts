import { Component, OnInit } from '@angular/core';
import { UserModel } from '../user.model';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/dashboard/modal/modal.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: UserModel[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (response: UserModel[]) => {
        this.users = response;
      },
      (error: any) => {
        console.log('Error', error);
        this.openSnackBar('No user was found')
      }
    );
  }

  newUser() {
    this.userService.isEdit = false;
    this.router.navigate(['../new'], { relativeTo: this.route });
  }

  editUser(userId: number) {
    this.userService.isEdit = true;
    this.router.navigate(['../edit', userId], { relativeTo: this.route });
  }

  openConfirmationModal(userId: number): void {
    const dialogRef: MatDialogRef<ModalComponent> = this.dialog.open(
      ModalComponent,
      {
        width: '50vh',
        data: 'Do you want to delete this user?',
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
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.openSnackBar("User has been successfully deleted")
        this.loadUsers();
      },
      (error: any) => {
        console.log('Error:', error);
        this.openSnackBar('User was not successfully deleted')
      }
    );
  }

  openSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 1250;

    this._snackBar.open(message, undefined, config);
  }
}
