import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContainerService } from '../container.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainerModel } from '../container.model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-container-form',
  templateUrl: './container-form.component.html',
  styleUrls: ['./container-form.component.css']
})
export class ContainerFormComponent {
  containerForm: FormGroup;
  containerId!: number;
  title!: string;
  isEdit!: boolean;
  hide: boolean = true;

  containers: ContainerModel[] = [];

  constructor(
    private containerService: ContainerService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.containerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      parentId: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.loadContainers();
    if (this.containerService.isEdit) {
      this.title = 'Edit';
      this.containerId = this.route.snapshot.params['id'];
      this.isEdit = this.containerService.isEdit;

      this.containerService.getContainer(this.containerId).subscribe(
        (container: any) => {
          console.log()
          this.containerForm.patchValue({
              name: container.name,
              description: container.description,
              parentId: container.parent.id
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
    this.router.navigate(['/dashboard/containers/list']);
  }

  loadContainers() {
    this.containerService.getContainers().subscribe(
      (response: ContainerModel[]) => {
        this.containers = response;
      },
      (error: any) => {
        console.error('Error:', error);
        this.openSnackBar(error);
      }
    );
  }

  submitForm() {
    if (this.containerForm.valid) {
      if (this.containerService.isEdit) {
        this.containerService.updateContainer(this.containerId, this.containerForm.value).subscribe(
          (response) => {
            console.log('Container updated:', response);
            this.openSnackBar('Container has been successfully modified')
            this.router.navigate(['../../'], { relativeTo: this.route });
          },
          (error) => {
            console.error('Error updating container:', error);
            this.openSnackBar('Container was not successfully modified')
          }
        );
      } else {
        this.containerService.addContainer(this.containerForm.value).subscribe(
          (response) => {
            console.log('Container added:', response);
            this.openSnackBar('Container has been successfully added')
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          (error) => {
            console.error('Error adding container:', error);
            this.openSnackBar('Container was not successfully added')
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
