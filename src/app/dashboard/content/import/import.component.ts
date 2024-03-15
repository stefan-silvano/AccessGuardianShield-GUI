import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { UserModel } from '../user/user.model';
import { ImportResponseComponent } from './import-response/import-response.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddressModel } from '../address/address.model';
import { AddressService } from '../address/address.service';
import { PermissionService } from '../permission/permission.service';
import { RoleService } from '../role/role.service';
import { OrganizationService } from '../organization/organization.service';
import { BussinessCodeService } from '../bussiness-code/bussiness-code.service';
import { AssignmentService } from '../assignment/assignment.service';
import { PermissionModel } from '../permission/permission.model';
import { RoleModel } from '../role/role.model';
import { OrganizationModel } from '../organization/organization.model';
import { BussinessCodeModel } from '../bussiness-code/bussiness-code.model';
import { ContainerService } from '../container/container.service';
import { ContainerModel } from '../container/container.model';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css'],
})
export class ImportComponent {
  jsonContent!: string;
  fileName!: string;

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private permissionService: PermissionService,
    private roleService: RoleService,
    private containerService: ContainerService,
    private organizationService: OrganizationService,
    private businessCodeService: BussinessCodeService,
    private assignmentService: AssignmentService,
    private dialog: MatDialog
  ) {}

  chips = [
    { label: 'Users', selected: true },
    { label: 'Addresses', selected: false },
    { label: 'Permissions', selected: false },
    { label: 'Roles', selected: false },
    { label: 'Containers', selected: false },
    { label: 'Organizations', selected: false },
    { label: 'Business-codes', selected: false },
    { label: 'User-permissions', selected: false },
    { label: 'User-roles', selected: false },
    { label: 'Role-permissions', selected: false },
  ];

  toggleChipSelection(chip: any) {
    if (!chip.selected) {
      const selectedChip = this.chips.find((c) => c.selected);
      if (selectedChip) {
        selectedChip.selected = false;
      }
      chip.selected = true;
    }
  }

  getSelectedChip(): string | null {
    const selectedChip = this.chips.find((chip) => chip.selected === true);
    return selectedChip ? selectedChip.label : null;
  }

  selectFile() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'application/json'; // Set the accepted file types if needed
    fileInput.addEventListener('change', (event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          this.jsonContent = reader.result as string;
          this.fileName = file.name;
        };
        reader.readAsText(file);
      }
    });
    fileInput.click();
  }

  allowDrop(event: any) {
    event.preventDefault();
  }

  handleDrop(event: any) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.jsonContent = reader.result as string;
      this.fileName = file.name;
    };
    reader.readAsText(file);
  }

  resetDrop() {
    this.jsonContent = '';
    this.fileName = '';
  }

  openViewModal(message: any): void {
    const dialogRef: MatDialogRef<ImportResponseComponent> = this.dialog.open(
      ImportResponseComponent,
      {
        width: '60vh',
        data: message,
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        console.log('confirm');
      }
    });
  }

  submit() {
    switch (this.getSelectedChip()) {
      case 'Users': {
        try {
          const parsedData: UserModel[] = JSON.parse(this.jsonContent);
          this.userService.addUsers(parsedData).subscribe(
            (response) => {
              let message: string[] = [];
              response.forEach((user: any) => {
                message.push(user.message);
              });
              this.openViewModal(message);
            },
            (error) => {
              this.openViewModal('The JSON must be an array');
            }
          );
        } catch (error: any) {
          this.openViewModal(error.message);
        }
        break;
      }
      case 'Addresses': {
        try {
          const parsedData: AddressModel[] = JSON.parse(this.jsonContent);
          this.addressService.addAddresses(parsedData).subscribe(
            (response) => {
              let message: string[] = [];
              response.forEach((address: any) => {
                message.push(address.message);
              });
              this.openViewModal(message);
            },
            (error) => {
              this.openViewModal('The JSON must be an array');
            }
          );
        } catch (error: any) {
          this.openViewModal(error.message);
        }
        break;
      }
      case 'Permissions': {
        try {
          const parsedData: PermissionModel[] = JSON.parse(this.jsonContent);
          this.permissionService.addPermissions(parsedData).subscribe(
            (response) => {
              let message: string[] = [];
              response.forEach((permission: any) => {
                message.push(permission.message);
              });
              this.openViewModal(message);
            },
            (error) => {
              this.openViewModal('The JSON must be an array');
            }
          );
        } catch (error: any) {
          this.openViewModal(error.message);
        }
        break;
      }
      case 'Roles': {
        try {
          const parsedData: RoleModel[] = JSON.parse(this.jsonContent);
          this.roleService.addRoles(parsedData).subscribe(
            (response) => {
              let message: string[] = [];
              response.forEach((role: any) => {
                message.push(role.message);
              });
              this.openViewModal(message);
            },
            (error) => {
              this.openViewModal('The JSON must be an array');
            }
          );
        } catch (error: any) {
          this.openViewModal(error.message);
        }
        break;
      }
      case 'Containers': {
        try {
          const parsedData: ContainerModel[] = JSON.parse(this.jsonContent);
          this.containerService.addContainers(parsedData).subscribe(
            (response) => {
              let message: string[] = [];
              response.forEach((container: any) => {
                message.push(container.message);
              });
              this.openViewModal(message);
            },
            (error) => {
              this.openViewModal('The JSON must be an array');
            }
          );
        } catch (error: any) {
          this.openViewModal(error.message);
        }
        break;
      }
      case 'Organizations': {
        try {
          const parsedData: OrganizationModel[] = JSON.parse(this.jsonContent);
          this.organizationService.addOrganizations(parsedData).subscribe(
            (response) => {
              let message: string[] = [];
              response.forEach((organization: any) => {
                message.push(organization.message);
              });
              this.openViewModal(message);
            },
            (error) => {
              this.openViewModal('The JSON must be an array');
            }
          );
        } catch (error: any) {
          this.openViewModal(error.message);
        }
        break;
      }
      case 'Business-codes': {
        try {
          const parsedData: BussinessCodeModel[] = JSON.parse(this.jsonContent);
          this.businessCodeService.addBusinessCodes(parsedData).subscribe(
            (response) => {
              let message: string[] = [];
              response.forEach((businessCode: any) => {
                message.push(businessCode.message);
              });
              this.openViewModal(message);
            },
            (error) => {
              this.openViewModal('The JSON must be an array');
            }
          );
        } catch (error: any) {
          this.openViewModal(error.message);
        }
        break;
      }
      case 'User-permissions': {
        try {
          const parsedData: any[] = JSON.parse(this.jsonContent);
          this.assignmentService.addUserPermissions(parsedData).subscribe(
            (response) => {
              let message: string[] = [];
              response.forEach((userPermission: any) => {
                message.push(userPermission.message);
              });
              this.openViewModal(message);
            },
            (error) => {
              this.openViewModal('The JSON must be an array');
            }
          );
        } catch (error: any) {
          this.openViewModal(error.message);
        }
        break;
      }
      case 'User-roles': {
        try {
          const parsedData: any[] = JSON.parse(this.jsonContent);
          this.assignmentService.addUserRoles(parsedData).subscribe(
            (response) => {
              let message: string[] = [];
              response.forEach((userRole: any) => {
                message.push(userRole.message);
              });
              this.openViewModal(message);
            },
            (error) => {
              this.openViewModal('The JSON must be an array');
            }
          );
        } catch (error: any) {
          this.openViewModal(error.message);
        }
        break;
      }
      case 'Role-permissions': {
        try {
          const parsedData: any[] = JSON.parse(this.jsonContent);
          this.assignmentService.addRolePermissions(parsedData).subscribe(
            (response) => {
              let message: string[] = [];
              response.forEach((rolePermission: any) => {
                message.push(rolePermission.message);
              });
              this.openViewModal(message);
            },
            (error) => {
              this.openViewModal('The JSON must be an array');
            }
          );
        } catch (error: any) {
          this.openViewModal(error.message);
        }
        break;
      }
      default:
        break;
    }
  }
}
