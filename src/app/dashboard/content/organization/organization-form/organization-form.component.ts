import { Component } from '@angular/core';
import { OrganizationService } from '../organization.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationModel } from '../organization.model';
import { AddressModel } from '../../address/address.model';
import { AddressService } from '../../address/address.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.css'],
})
export class OrganizationFormComponent {
  organizationForm: FormGroup;
  organizationId!: number;
  title!: string;
  isEdit!: boolean;

  addresses: AddressModel[] = [];

  constructor(
    private organizationService: OrganizationService,
    private addressService: AddressService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.organizationForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^\d{4,12}$/
        ),
      ]),
      addressId: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.loadAddresses()
    if (this.organizationService.isEdit) {
      this.title = 'Edit';
      this.organizationId = this.route.snapshot.params['id'];
      this.isEdit = this.organizationService.isEdit;

      this.organizationService.getOrganization(this.organizationId).subscribe(
        (organization: any) => {
          this.organizationForm.patchValue({
            name: organization.name,
            description: organization.description,
            phoneNumber: organization.phoneNumber,
            addressId: organization.address.id
          });
        },
        (error: any) => {
          console.error('Error fetching user:', error);
        }
      );
    } else {
      this.title = 'Create';
    }
  }

  onBack() {
    this.router.navigate(['/dashboard/organizations/list']);
  }

  loadAddresses() {
    this.addressService.getAddresses().subscribe(
      (response: AddressModel[]) => {
        this.addresses = response;
      },
      (error: any) => {
        console.error('Error:', error);
        this.openSnackBar(error)
      }
    );
  }

  submitForm() {
    if (this.organizationForm.valid) {
      if (this.organizationService.isEdit) {
        this.organizationService.updateOrganization(this.organizationId, this.organizationForm.value).subscribe(
          (response) => {
            console.log('Organization updated:', response);
            this.openSnackBar('Organization has been successfully modified')
            this.router.navigate(['../../'], { relativeTo: this.route });
          },
          (error) => {
            console.error('Error:', error);
            this.openSnackBar('Organization was not successfully modified')
          }
        );
      } else {
        this.organizationService.addOrganization(this.organizationForm.value).subscribe(
          (response) => {
            console.log('Organization added:', response);
            this.openSnackBar('Organization has been successfully added')
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          (error) => {
            console.error('Error:', error);
            this.openSnackBar('Organization was not successfully added')
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
