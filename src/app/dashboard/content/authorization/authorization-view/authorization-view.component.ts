import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserRoleViewComponent } from '../../assignment/assignment-list/user-role-list/user-role-view/user-role-view.component';

@Component({
  selector: 'app-authorization-view',
  templateUrl: './authorization-view.component.html',
  styleUrls: ['./authorization-view.component.css']
})
export class AuthorizationViewComponent {
  constructor(
    public dialogRef: MatDialogRef<UserRoleViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onBackClick(): void {
    this.dialogRef.close('back');
  }
}
