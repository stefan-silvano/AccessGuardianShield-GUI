import { Component } from '@angular/core';
import { AddressModel } from '../address.model';
import { AddressService } from '../address.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from 'src/app/dashboard/modal/modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css'],
})
export class AddressListComponent {
  addresses: AddressModel[] = [];

  constructor(
    private addressService: AddressService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadAddresses();
  }

  loadAddresses() {
    this.addressService.getAddresses().subscribe(
      (response: AddressModel[]) => {
        this.addresses = response;
      },
      (error: any) => {
        console.error('Error:', error);
        this.openSnackBar('No address was found')
      }
    );
  }

  newAddress() {
    this.addressService.isEdit = false;
    this.router.navigate(['../new'], { relativeTo: this.route });
  }

  editAddress(addressId: number) {
    this.addressService.isEdit = true;
    this.router.navigate(['../edit', addressId], { relativeTo: this.route });
  }

  openConfirmationModal(userId: number): void {
    const dialogRef: MatDialogRef<ModalComponent> = this.dialog.open(
      ModalComponent,
      {
        width: '50vh',
        data: 'Do you want to delete this address?',
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

  cancelAction(): void {}

  confirmAction(userId: number): void {
    this.addressService.deleteAddress(userId).subscribe(
      () => {
        console.log('Address deleted successfully.');
        this.openSnackBar('Address has been successfully deleted')
        this.loadAddresses();
      },
      (error: any) => {
        console.error('Error:', error);
        this.openSnackBar('Address was not successfully deleted');
      }
    );
  }

  openSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 1250;

    this._snackBar.open(message, undefined, config);
  }
}
