import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PermissionService } from '../permission.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainerModel } from '../../container/container.model';
import { ContainerService } from '../../container/container.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-permission-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.css'],
})
export class PermissionFormComponent {
  permissionForm: FormGroup;
  permissionId!: number;
  title!: string;
  isEdit!: boolean;

  containers: ContainerModel[] = [];
  riskLevels: any[] = ['Low', 'Medium', 'High', 'Critical'];

  constructor(
    private permissionService: PermissionService,
    private containerService: ContainerService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.permissionForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      riskLevel: new FormControl('', [Validators.required]),
      containerId: new FormControl('', [Validators.required]),
    });
  }


  ngOnInit(): void {
    this.loadContainers();
    if (this.permissionService.isEdit) {
      this.title = 'Edit';
      this.permissionId = this.route.snapshot.params['id'];
      this.isEdit = this.permissionService.isEdit;

      this.permissionService.getPermission(this.permissionId).subscribe(
        (permission: any) => {
          this.permissionForm.patchValue({
            name: permission.name,
            description: permission.description,
            riskLevel: this.riskLevels[this.riskLevels.indexOf(permission.riskLevel)],
            containerId: permission.container.id
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
    this.containerService.getContainers().subscribe(
      (response: ContainerModel[]) => {
        this.containers = response;
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  onBack() {
    this.router.navigate(['/dashboard/permissions/list']);
  }

  submitForm() {
    if (this.permissionForm.valid) {
      if (this.permissionService.isEdit) {
        this.permissionService
          .updatePermission(this.permissionId, this.permissionForm.value)
          .subscribe(
            (response) => {
              console.log('Permission updated:', response);
              this.openSnackBar('Permission has been successfully modified')
              this.router.navigate(['../../'], { relativeTo: this.route });
            },
            (error) => {
              console.error('Error updating permission:', error);
              this.openSnackBar('Permission was not successfully modified')
            }
          );
      } else {
        console.log(this.permissionForm.value);
        this.permissionService
          .addPermission(this.permissionForm.value)
          .subscribe(
            (response) => {
              console.log('Permission added:', response);
              this.openSnackBar('Permission has been successfully added')
              this.router.navigate(['../'], { relativeTo: this.route });
            },
            (error) => {
              console.error('Error adding permission:', error);
              this.openSnackBar('Permission was not successfully added')
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
