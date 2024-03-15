import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-role-view',
  templateUrl: './user-role-view.component.html',
  styleUrls: ['./user-role-view.component.css']
})
export class UserRoleViewComponent {
  constructor(
    public dialogRef: MatDialogRef<UserRoleViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onYesClick(): void {
    this.dialogRef.close('confirm');
  }
}
