import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-role-permission-view',
  templateUrl: './role-permission-view.component.html',
  styleUrls: ['./role-permission-view.component.css']
})
export class RolePermissionViewComponent {
  constructor(
    public dialogRef: MatDialogRef<RolePermissionViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onYesClick(): void {
    this.dialogRef.close('confirm');
  }
}
