import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../../user/user.model';
import { PermissionModel } from '../../../permission/permission.model';
import { UserService } from '../../../user/user.service';
import { PermissionService } from '../../../permission/permission.service';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { AssignmentService } from '../../assignment.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-user-permission-form',
  templateUrl: './user-permission-form.component.html',
  styleUrls: ['./user-permission-form.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    DatePipe,
  ],
})
export class UserPermissionFormComponent {
  userPermissionForm: FormGroup;

  users: UserModel[] = [];
  permissions: PermissionModel[] = [];

  constructor(
    private assignmentService: AssignmentService,
    private userService: UserService,
    private permissionService: PermissionService,
    private router: Router,
    private route: ActivatedRoute,
    private dateAdapter: DateAdapter<Date>,
    private datePipe: DatePipe,
    private _snackBar: MatSnackBar
  ) {
    this.dateAdapter.setLocale('ro-Ro');

    this.userPermissionForm = new FormGroup({
      userId: new FormControl('', [Validators.required]),
      permissionId: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadPermissions();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (response: UserModel[]) => {
        this.users = response;
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
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

  submitForm() {
    const startDateFormated = this.datePipe.transform(
      this.userPermissionForm.value.startDate,
      'yyyy-MM-dd HH:mm:ss'
    );
    const endDateFormated = this.datePipe.transform(
      this.userPermissionForm.value.endDate,
      'yyyy-MM-dd HH:mm:ss'
    );
    this.userPermissionForm.value.startDate = startDateFormated;
    this.userPermissionForm.value.endDate = endDateFormated;

    console.log(this.userPermissionForm.value);
    if (this.userPermissionForm.valid) {
      this.assignmentService
        .addUserPermission(this.userPermissionForm.value)
        .subscribe(
          (response) => {
            this.assignmentService.isAdd = false;
            this.router.navigate(['../'], { relativeTo: this.route });
            console.log('User-permission added:', response);
            this.openSnackBar('User-permission has been successfully added')
          },
          (error) => {
            console.error('Error:', error);
            this.openSnackBar('User-permission was not successfully added');
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
