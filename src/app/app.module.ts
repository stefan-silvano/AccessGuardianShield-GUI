import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './dashboard/content/user/user.component';
import { AuthComponent } from './auth/auth.component';
import { SideBarComponent } from './dashboard/side-bar/side-bar.component';
import { UserListComponent } from './dashboard/content/user/user-list/user-list.component';
import { UserFormComponent } from './dashboard/content/user/user-form/user-form.component';
import { ModalComponent } from './dashboard/modal/modal.component';
import { AddressComponent } from './dashboard/content/address/address.component';
import { AddressListComponent } from './dashboard/content/address/address-list/address-list.component';
import { AuthInterceptorProvider } from './auth/auth.interceptor';
import { AddressFormComponent } from './dashboard/content/address/address-form/address-form.component';
import { PermissionComponent } from './dashboard/content/permission/permission.component';
import { PermissionListComponent } from './dashboard/content/permission/permission-list/permission-list.component';
import { PermissionFormComponent } from './dashboard/content/permission/permission-form/permission-form.component';
import { RoleComponent } from './dashboard/content/role/role.component';
import { RoleListComponent } from './dashboard/content/role/role-list/role-list.component';
import { RoleFormComponent } from './dashboard/content/role/role-form/role-form.component';
import { ContainerComponent } from './dashboard/content/container/container.component';
import { ContainerListComponent } from './dashboard/content/container/container-list/container-list.component';
import { ContainerFormComponent } from './dashboard/content/container/container-form/container-form.component';
import { OrganizationComponent } from './dashboard/content/organization/organization.component';
import { OrganizationListComponent } from './dashboard/content/organization/organization-list/organization-list.component';
import { OrganizationFormComponent } from './dashboard/content/organization/organization-form/organization-form.component';
import { BussinessCodeComponent } from './dashboard/content/bussiness-code/bussiness-code.component';
import { BussinessCodeListComponent } from './dashboard/content/bussiness-code/bussiness-code-list/bussiness-code-list.component';
import { BussinessCodeFormComponent } from './dashboard/content/bussiness-code/bussiness-code-form/bussiness-code-form.component';
import { AssignmentComponent } from './dashboard/content/assignment/assignment.component';
import { UserPermissionFormComponent } from './dashboard/content/assignment/assignment-form/user-permission-form/user-permission-form.component';
import { UserRoleFormComponent } from './dashboard/content/assignment/assignment-form/user-role-form/user-role-form.component';
import { RolePermissionFormComponent } from './dashboard/content/assignment/assignment-form/role-permission-form/role-permission-form.component';
import { AssignmentListComponent } from './dashboard/content/assignment/assignment-list/assignment-list.component';
import { AssignmentFormComponent } from './dashboard/content/assignment/assignment-form/assignment-form.component';
import { UserPermissionListComponent } from './dashboard/content/assignment/assignment-list/user-permission-list/user-permission-list.component';
import { UserRoleListComponent } from './dashboard/content/assignment/assignment-list/user-role-list/user-role-list.component';
import { RolePermissionListComponent } from './dashboard/content/assignment/assignment-list/role-permission-list/role-permission-list.component';
import { UserPermissionViewComponent } from './dashboard/content/assignment/assignment-list/user-permission-list/user-permission-view/user-permission-view.component';
import { UserRoleViewComponent } from './dashboard/content/assignment/assignment-list/user-role-list/user-role-view/user-role-view.component';
import { RolePermissionViewComponent } from './dashboard/content/assignment/assignment-list/role-permission-list/role-permission-view/role-permission-view.component';
import { AuthorizationComponent } from './dashboard/content/authorization/authorization.component';
import { AuthorizationViewComponent } from './dashboard/content/authorization/authorization-view/authorization-view.component';
import { ImportComponent } from './dashboard/content/import/import.component';
import { ExportComponent } from './dashboard/content/export/export.component';
import { ImportResponseComponent } from './dashboard/content/import/import-response/import-response.component';
import { HomeComponent } from './home/home.component';
import { HomeNavComponent } from './home/home-nav/home-nav.component';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    AuthComponent,
    SideBarComponent,
    UserListComponent,
    UserFormComponent,
    ModalComponent,
    AddressComponent,
    AddressListComponent,
    AddressFormComponent,
    PermissionComponent,
    PermissionListComponent,
    PermissionFormComponent,
    RoleComponent,
    RoleListComponent,
    RoleFormComponent,
    ContainerComponent,
    ContainerListComponent,
    ContainerFormComponent,
    OrganizationComponent,
    OrganizationListComponent,
    OrganizationFormComponent,
    BussinessCodeComponent,
    BussinessCodeListComponent,
    BussinessCodeFormComponent,
    AssignmentComponent,
    UserPermissionFormComponent,
    UserRoleFormComponent,
    RolePermissionFormComponent,
    AssignmentListComponent,
    AssignmentFormComponent,
    UserPermissionListComponent,
    UserRoleListComponent,
    RolePermissionListComponent,
    UserPermissionViewComponent,
    UserRoleViewComponent,
    RolePermissionViewComponent,
    AuthorizationComponent,
    AuthorizationViewComponent,
    ImportComponent,
    ExportComponent,
    ImportResponseComponent,
    HomeComponent,
    HomeNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DragDropModule,
    MatChipsModule,
    MatMenuModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
