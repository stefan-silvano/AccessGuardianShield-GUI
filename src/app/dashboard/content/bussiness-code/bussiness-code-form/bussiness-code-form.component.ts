import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BussinessCodeService } from '../bussiness-code.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BussinessCodeModel } from '../bussiness-code.model';
import { RoleModel } from '../../role/role.model';
import { RoleService } from '../../role/role.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bussiness-code-form',
  templateUrl: './bussiness-code-form.component.html',
  styleUrls: ['./bussiness-code-form.component.css']
})
export class BussinessCodeFormComponent {
  businessCodeForm: FormGroup;
  userId!: number;
  title!: string;
  isEdit!: boolean;
  hide: boolean = true;

  roles: RoleModel[] = []

  constructor(
    private businessCodeService: BussinessCodeService,
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.businessCodeForm = new FormGroup({
      code: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      roleId: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.loadRoles();
    if (this.businessCodeService.isEdit) {
      this.title = 'Edit';
      this.userId = this.route.snapshot.params['id'];
      this.isEdit = this.businessCodeService.isEdit;

      this.businessCodeService.getBusinessCode(this.userId).subscribe(
        (businessCode: any) => {
          this.businessCodeForm.patchValue({
            code: businessCode.code,
            roleId: businessCode.role.id
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
    this.router.navigate(['/dashboard/business-codes/list']);
  }

  loadRoles() {
    this.roleService.getRoles().subscribe(
      (response: RoleModel[]) => {
        this.roles = response;
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  submitForm() {
    if (this.businessCodeForm.valid) {
      if (this.businessCodeService.isEdit) {
        this.businessCodeService.updateBussinessCode(this.userId, this.businessCodeForm.value).subscribe(
          (response) => {
            console.log('Business-code business-code:', response);
            this.openSnackBar('Business-code has been successfully modified')
            this.router.navigate(['../../'], { relativeTo: this.route });
          },
          (error) => {
            console.error('Error:', error);
            this.openSnackBar('Business-code was not successfully modified')
          }
        );
      } else {
        this.businessCodeService.addBusinessCode(this.businessCodeForm.value).subscribe(
          (response) => {
            console.log('Business-code added:', response);
            this.openSnackBar('Business-code has been successfully added')
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          (error) => {
            console.error('Error:', error);
            this.openSnackBar('Business-code was not successfully added')
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
