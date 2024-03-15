import { Component, OnInit, Renderer2 } from '@angular/core';
import { UserService } from '../user/user.service';
import { UserModel } from '../user/user.model';
import { PermissionService } from '../permission/permission.service';
import { AddressService } from '../address/address.service';
import { RoleService } from '../role/role.service';
import { ContainerService } from '../container/container.service';
import { OrganizationService } from '../organization/organization.service';
import { BussinessCodeService } from '../bussiness-code/bussiness-code.service';
import { AssignmentService } from '../assignment/assignment.service';
import { AddressModel } from '../address/address.model';
import { PermissionModel } from '../permission/permission.model';
import { RoleModel } from '../role/role.model';
import { ContainerModel } from '../container/container.model';
import { OrganizationModel } from '../organization/organization.model';
import { BussinessCodeModel } from '../bussiness-code/bussiness-code.model';
import { UserPermissionModel } from '../assignment/assignment-list/user-permission.model';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css'],
})
export class ExportComponent implements OnInit {
  data: any;

  constructor(
    private renderer: Renderer2,
    private userService: UserService,
    private addressService: AddressService,
    private permissionService: PermissionService,
    private roleService: RoleService,
    private containerService: ContainerService,
    private organizationService: OrganizationService,
    private businessCodeService: BussinessCodeService,
    private assignmentService: AssignmentService
  ) {}

  ngOnInit(): void {}

  exports: string[] = [
    'Users',
    'Addresses',
    'Permissions',
    'Roles',
    'Containers',
    'Organizations',
    'Business-codes',
    'User-permissions',
    'User-roles',
    'Role-permissions',
  ];

  loadData(type: string): Promise<void> {
    switch (type) {
      case 'Users': {
        return new Promise<void>((resolve, reject) => {
          this.userService.getUsers().subscribe(
            (response: UserModel[]) => {
              this.data = response;
              resolve();
            },
            (error: any) => {
              console.error('Error:', error);
              reject(error);
            }
          );
        });
      }
      case 'Addresses': {
        return new Promise<void>((resolve, reject) => {
          this.addressService.getAddresses().subscribe(
            (response: AddressModel[]) => {
              this.data = response;
              resolve();
            },
            (error: any) => {
              console.error('Error:', error);
              reject(error);
            }
          );
        });
      }
      case 'Permissions': {
        return new Promise<void>((resolve, reject) => {
          this.permissionService.getPermissions().subscribe(
            (response: PermissionModel[]) => {
              this.data = response;
              resolve();
            },
            (error: any) => {
              console.error('Error:', error);
              reject(error);
            }
          );
        });
      }
      case 'Roles': {
        return new Promise<void>((resolve, reject) => {
          this.roleService.getRoles().subscribe(
            (response: RoleModel[]) => {
              this.data = response;
              resolve();
            },
            (error: any) => {
              console.error('Error:', error);
              reject(error);
            }
          );
        });
      }
      case 'Containers': {
        return new Promise<void>((resolve, reject) => {
          this.containerService.getContainers().subscribe(
            (response: ContainerModel[]) => {
              this.data = response;
              resolve();
            },
            (error: any) => {
              console.error('Error:', error);
              reject(error);
            }
          );
        });
      }
      case 'Organizations': {
        return new Promise<void>((resolve, reject) => {
          this.organizationService.getOrganizations().subscribe(
            (response: OrganizationModel[]) => {
              this.data = response;
              resolve();
            },
            (error: any) => {
              console.error('Error:', error);
              reject(error);
            }
          );
        });
      }
      case 'Business-codes': {
        return new Promise<void>((resolve, reject) => {
          this.businessCodeService.getBusinessCodes().subscribe(
            (response: BussinessCodeModel[]) => {
              this.data = response;
              resolve();
            },
            (error: any) => {
              console.error('Error:', error);
              reject(error);
            }
          );
        });
      }
      case 'User-permissions': {
        return new Promise<void>((resolve, reject) => {
          this.assignmentService.getUserPermissions().subscribe(
            (response: UserPermissionModel[]) => {
              this.data = response;
              resolve();
            },
            (error: any) => {
              console.error('Error:', error);
              reject(error);
            }
          );
        });
      }
      case 'User-roles': {
        return new Promise<void>((resolve, reject) => {
          this.assignmentService.getUserRoles().subscribe(
            (response: any[]) => {
              this.data = response;
              resolve();
            },
            (error: any) => {
              console.error('Error:', error);
              reject(error);
            }
          );
        });
      }
      case 'Role-permissions': {
        return new Promise<void>((resolve, reject) => {
          this.assignmentService.getRolePermissions().subscribe(
            (response: any[]) => {
              this.data = response;
              resolve();
            },
            (error: any) => {
              console.error('Error:', error);
              reject(error);
            }
          );
        });
      }
    }
    return Promise.resolve();
  }

  async exportData(type: string) {
    try {
      await this.loadData(type);
      const jsonData = JSON.stringify(this.data);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = this.renderer.createElement('a');
      this.renderer.setAttribute(link, 'href', url);
      this.renderer.setAttribute(link, 'download', 'export.json');
      this.renderer.setStyle(link, 'display', 'none');
      this.renderer.appendChild(document.body, link);
      link.click();
      this.renderer.removeChild(document.body, link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  }
}
