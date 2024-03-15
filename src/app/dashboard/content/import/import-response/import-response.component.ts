import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-import-response',
  templateUrl: './import-response.component.html',
  styleUrls: ['./import-response.component.css']
})
export class ImportResponseComponent {
  constructor(
    public dialogRef: MatDialogRef<ImportResponseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  isDataArray(): boolean {
    return Array.isArray(this.data);
  }

  onYesClick(): void {
    this.dialogRef.close('confirm');
  }
}
