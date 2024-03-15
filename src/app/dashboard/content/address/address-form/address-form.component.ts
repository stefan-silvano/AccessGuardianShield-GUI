import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../address.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressModel } from '../address.model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent {
  addressForm: FormGroup;
  addressId!: number;
  title!: string;
  isEdit!: boolean;

  constructor(
    private addressService: AddressService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.addressForm = new FormGroup({
      country: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      street: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      number: new FormControl('', [Validators.required]),
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      postalCode: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    if (this.addressService.isEdit) {
      this.title = 'Edit';
      this.addressId = this.route.snapshot.params['id'];
      this.isEdit = this.addressService.isEdit;

      this.addressService.getAddress(this.addressId).subscribe(
        (address: AddressModel) => {
          this.addressForm.patchValue({
            street: address.street,
            country: address.country,
            number: address.number,
            city: address.city,
            postalCode: address.postalCode
          });
        },
        (error: any) => {
          console.error('Error fetching user:', error);
          this.openSnackBar('Error fetching user');
        }
      );
    } else {
      this.title = 'Create';
    }
  }

  onBack(){
    this.router.navigate(['/dashboard/addresses/list']);
  }

  submitForm() {
    if (this.addressForm.valid) {
      if (this.addressService.isEdit) {
        this.addressForm.value.password === '********'
          ? (this.addressForm.value.password = '')
          : this.addressForm.value.password;
        this.addressService.updateAddress(this.addressId, this.addressForm.value).subscribe(
          (response) => {
            console.log('Address updated:', response);
            this.openSnackBar("Address has been successfully modified")
            this.router.navigate(['../../'], { relativeTo: this.route });
          },
          (error) => {
            console.error('Error updating address:', error);
            this.openSnackBar('Address was not successfully modified');
          }
        );
      } else {
        this.addressService.addAddress(this.addressForm.value).subscribe(
          (response) => {
            console.log('Address added:', response);
            this.openSnackBar("Address has been successfully added")
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          (error) => {
            console.error('Error adding address:', error);
            this.openSnackBar('Address was not successfully added');
          }
        );
      }
    }
  }

  openSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 1250;

    this._snackBar.open(message, undefined, config);
  }
}
