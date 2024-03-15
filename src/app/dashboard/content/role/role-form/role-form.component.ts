import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContainerModel } from '../../container/container.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../role.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent {
  roleForm: FormGroup;
  roleId!: number;
  title!: string;
  isEdit!: boolean;

  containers: ContainerModel[] = [];
  riskLevels: any[] = ['Low', 'Medium', 'High', 'Critical'];
  types: any[] = ['User', 'Admin'];

  constructor(
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.roleForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      type: new FormControl('', [Validators.required]),
      riskLevel: new FormControl('', [Validators.required]),
      containerId: new FormControl('', [Validators.required]),
    });
  }


  ngOnInit(): void {
    this.loadContainers();
    if (this.roleService.isEdit) {
      this.title = 'Edit';
      this.roleId = this.route.snapshot.params['id'];
      this.isEdit = this.roleService.isEdit;

      this.roleService.getRole(this.roleId).subscribe(
        (role: any) => {
          this.roleForm.patchValue({
            name: role.name,
            description: role.description,
            type: this.types[this.types.indexOf(role.type)],
            riskLevel: this.riskLevels[this.riskLevels.indexOf(role.riskLevel)],
            containerId: role.container.id
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

  loadContainers() {
    this.roleService.getContainers().subscribe(
      (response: ContainerModel[]) => {
        this.containers = response;
      },
      (error: any) => {
        console.error('Error:', error);
        this.openSnackBar(error.error.message);
      }
    );
  }

  onBack() {
    this.router.navigate(['/dashboard/roles/list']);
  }

  submitForm() {
    if (this.roleForm.valid) {
      if (this.roleService.isEdit) {
        this.roleService
          .updateRole(this.roleId, this.roleForm.value)
          .subscribe(
            (response) => {
              console.log('Role updated:', response);
              this.openSnackBar('Role has been successfully modified')
              this.router.navigate(['../../'], { relativeTo: this.route });
            },
            (error) => {
              console.error('Error updating role:', error);
              this.openSnackBar('Role was not successfully modified')
            }
          );
      } else {
        console.log(this.roleForm.value);
        this.roleService
          .addRole(this.roleForm.value)
          .subscribe(
            (response) => {
              console.log('Role added:', response);
              this.openSnackBar('Role has been successfully added')
              this.router.navigate(['../'], { relativeTo: this.route });
            },
            (error) => {
              console.error('Error adding role:', error);
              this.openSnackBar('Role was not successfully added')
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
