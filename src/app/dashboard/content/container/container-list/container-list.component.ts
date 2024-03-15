import { Component } from '@angular/core';
import { ContainerModel } from '../container.model';
import { ContainerService } from '../container.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/dashboard/modal/modal.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.css']
})
export class ContainerListComponent {
  containers: ContainerModel[] = [];

  constructor(
    private containerService: ContainerService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadContainer();
  }

  loadContainer() {
    this.containerService.getContainers().subscribe(
      (response: ContainerModel[]) => {
        this.containers = response;
      },
      (error: any) => {
        console.error('Error:', error);
        this.openSnackBar('No container was found')
      }
    );
  }

  newContainer() {
    this.containerService.isEdit = false;
    this.router.navigate(['../new'], { relativeTo: this.route });
  }

  editContainer(userId: number) {
    this.containerService.isEdit = true;
    this.router.navigate(['../edit', userId], { relativeTo: this.route });
  }

  openConfirmationModal(userId: number): void {
    const dialogRef: MatDialogRef<ModalComponent> = this.dialog.open(
      ModalComponent,
      {
        width: '50vh',
        data: 'Do you want to delete this user?',
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

  cancelAction(): void {

  }

  confirmAction(userId: number): void {
    this.containerService.deleteContainer(userId).subscribe(
      () => {
        console.log("Container deleted successfully.");
        this.openSnackBar('Container has been successfully deleted')
        this.loadContainer();
      },
      (error: any) => {
        console.error('Error:', error);
        this.openSnackBar('Container was not successfully deleted')
      }
    );
  }

  openSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 1250;

    this._snackBar.open(message, undefined, config);
  }
}
