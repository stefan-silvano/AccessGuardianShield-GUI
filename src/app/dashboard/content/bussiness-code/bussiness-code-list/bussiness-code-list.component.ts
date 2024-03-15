import { Component } from '@angular/core';
import { BussinessCodeModel } from '../bussiness-code.model';
import { BussinessCodeService } from '../bussiness-code.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/dashboard/modal/modal.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bussiness-code-list',
  templateUrl: './bussiness-code-list.component.html',
  styleUrls: ['./bussiness-code-list.component.css']
})
export class BussinessCodeListComponent {
  businessCodes: BussinessCodeModel[] = [];

  constructor(
    private businessCodeService: BussinessCodeService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadBusinessCodes();
  }

  loadBusinessCodes() {
    this.businessCodeService.getBusinessCodes().subscribe(
      (response: BussinessCodeModel[]) => {
        this.businessCodes = response;
      },
      (error: any) => {
        console.error('Error:', error);
        this.openSnackBar('No business-code was found')
      }
    );
  }

  newBusinessCodes() {
    this.businessCodeService.isEdit = false;
    this.router.navigate(['../new'], { relativeTo: this.route });
  }

  editBusinessCodes(businessCodesId: number) {
    this.businessCodeService.isEdit = true;
    this.router.navigate(['../edit', businessCodesId], { relativeTo: this.route });
  }

  openConfirmationModal(businessCodesId: number): void {
    const dialogRef: MatDialogRef<ModalComponent> = this.dialog.open(
      ModalComponent,
      {
        width: '50vh',
        data: 'Do you want to delete this business-code?',
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.confirmAction(businessCodesId);
      } else {
        this.cancelAction();
      }
    });
  }

  cancelAction(): void {
    this.loadBusinessCodes();
  }

  confirmAction(userId: number): void {
    this.businessCodeService.deleteBussinessCode(userId).subscribe(
      () => {
        console.log("Business-code deleted successfully.");
        this.openSnackBar('Business-code has been successfully deleted')
        this.loadBusinessCodes();
      },
      (error: any) => {
        console.error('Error:', error);
        this.openSnackBar('Business-code was not successfully deleted')
      }
    );
  }

  openSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 1250;

    this._snackBar.open(message, undefined, config);
  }
}
