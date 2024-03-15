import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { AssignmentService } from '../../assignment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleModel } from '../../../role/role.model';
import { PermissionModel } from '../../../permission/permission.model';
import { OrganizationModel } from '../../../organization/organization.model';
import { RoleService } from '../../../role/role.service';
import { PermissionService } from '../../../permission/permission.service';
import { OrganizationService } from '../../../organization/organization.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-role-permission-form',
  templateUrl: './role-permission-form.component.html',
  styleUrls: ['./role-permission-form.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    DatePipe,
  ]
})

export class RolePermissionFormComponent {
  userRoleForm: FormGroup;

  roles: RoleModel[] = [];
  permissions: PermissionModel[] = [];
  organizations: OrganizationModel[] = [];

  constructor(
    private assignmentService: AssignmentService,
    private roleService: RoleService,
    private permissionService: PermissionService,
    private organizationService: OrganizationService,
    private router: Router,
    private route: ActivatedRoute,
    private dateAdapter: DateAdapter<Date>,
    private datePipe: DatePipe,
    private _snackBar: MatSnackBar
  ) {
    this.dateAdapter.setLocale('ro-Ro');

    this.userRoleForm = new FormGroup({
      roleId: new FormControl('', [Validators.required]),
      permissionId: new FormControl('', [Validators.required]),
      organizationId: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  ngOnInit(): void {
    this.loadPermissions();
    this.loadRoles();
    this.loadOrganizations();
  }

  loadPermissions() {
    this.permissionService.getPermissions().subscribe(
      (response: PermissionModel[]) => {
        this.permissions = response;
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
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

  loadOrganizations() {
    this.organizationService.getOrganizations().subscribe(
      (response: OrganizationModel[]) => {
        this.organizations = response;
        console.log(response);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  submitForm() {
    const startDateFormated = this.datePipe.transform(
      this.userRoleForm.value.startDate,
      'yyyy-MM-dd HH:mm:ss'
    );
    const endDateFormated = this.datePipe.transform(
      this.userRoleForm.value.endDate,
      'yyyy-MM-dd HH:mm:ss'
    );
    this.userRoleForm.value.startDate = startDateFormated;
    this.userRoleForm.value.endDate = endDateFormated;

    console.log(this.userRoleForm.value);
    if (this.userRoleForm.valid) {
      this.assignmentService
        .addRolePermission(this.userRoleForm.value)
        .subscribe(
          (response) => {
            this.assignmentService.isAdd = false;
            this.router.navigate(['../'], { relativeTo: this.route });
            console.log('Role-permission added:', response);
            this.openSnackBar('Role-permission has been successfully added')
          },
          (error) => {
            console.error('Error:', error);
            this.openSnackBar('Role-permission was not successfully added');
          }
        );
    }
  }

  openSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 1250;

    this._snackBar.open(message, undefined, config);
  }
}
