import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-permission-view',
  templateUrl: './user-permission-view.component.html',
  styleUrls: ['./user-permission-view.component.css']
})
export class UserPermissionViewComponent {
  constructor(
    public dialogRef: MatDialogRef<UserPermissionViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onYesClick(): void {
    this.dialogRef.close('confirm');
  }
}
