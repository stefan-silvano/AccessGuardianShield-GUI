import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OrganizationModel } from '../organization.model';
import { OrganizationService } from '../organization.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from 'src/app/dashboard/modal/modal.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css']
})
export class OrganizationListComponent {
  organizations: OrganizationModel[] = [];

  constructor(
    private organizationService: OrganizationService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadOrganizations();
  }

  loadOrganizations() {
    this.organizationService.getOrganizations().subscribe(
      (response: OrganizationModel[]) => {
        this.organizations = response;
      },
      (error: any) => {
        console.error('Error:', error);
        this.openSnackBar('No organization was found')
      }
    );
  }

  newOrganization() {
    this.organizationService.isEdit = false;
    this.router.navigate(['../new'], { relativeTo: this.route });
  }

  editOrganization(organizationId: number) {
    this.organizationService.isEdit = true;
    this.router.navigate(['../edit', organizationId], { relativeTo: this.route });
  }

  openConfirmationModal(organizationId: number): void {
    const dialogRef: MatDialogRef<ModalComponent> = this.dialog.open(
      ModalComponent,
      {
        width: '50vh',
        data: 'Do you want to delete this organization?',
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.confirmAction(organizationId);
      } else {
        this.cancelAction();
      }
    });
  }

  cancelAction(): void {

  }

  confirmAction(userId: number): void {
    this.organizationService.deleteOrganization(userId).subscribe(
      () => {
        console.log("Organization deleted successfully.");
        this.openSnackBar('Organization has been successfully deleted')
        this.loadOrganizations();
      },
      (error: any) => {
        console.error('Error:', error);
        this.openSnackBar('Organization was not successfully deleted')
      }
    );
  }

  openSnackBar(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 1250;

    this._snackBar.open(message, undefined, config);
  }
}
