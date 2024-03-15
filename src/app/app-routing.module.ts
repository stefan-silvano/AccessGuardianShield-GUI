import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AuthUserGuard } from './auth/guard/auth-user-guard.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/guard/auth-guard.service';
import { UserComponent } from './dashboard/content/user/user.component';
import { UserListComponent } from './dashboard/content/user/user-list/user-list.component';
import { UserFormComponent } from './dashboard/content/user/user-form/user-form.component';
import { AddressComponent } from './dashboard/content/address/address.component';
import { AddressListComponent } from './dashboard/content/address/address-list/address-list.component';
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
import { AssignmentListComponent } from './dashboard/content/assignment/assignment-list/assignment-list.component';
import { AssignmentComponent } from './dashboard/content/assignment/assignment.component';
import { AssignmentFormComponent } from './dashboard/content/assignment/assignment-form/assignment-form.component';
import { AuthorizationComponent } from './dashboard/content/authorization/authorization.component';
import { ImportComponent } from './dashboard/content/import/import.component';
import { ExportComponent } from './dashboard/content/export/export.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthUserGuard]},
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'users/list',
        pathMatch: 'full',
      },
      {
        path: 'users',
        component: UserComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: UserListComponent },
          { path: 'new', component: UserFormComponent },
          { path: 'edit/:id', component: UserFormComponent },
        ],
      },
      {
        path: 'addresses',
        component: AddressComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: AddressListComponent },
          { path: 'new', component: AddressFormComponent },
          { path: 'edit/:id', component: AddressFormComponent },
        ],
      },
      {
        path: 'permissions',
        component: PermissionComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: PermissionListComponent },
          { path: 'new', component: PermissionFormComponent },
          { path: 'edit/:id', component: PermissionFormComponent },
        ],
      },
      {
        path: 'roles',
        component: RoleComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: RoleListComponent },
          { path: 'new', component: RoleFormComponent },
          { path: 'edit/:id', component: RoleFormComponent },
        ],
      },
      {
        path: 'containers',
        component: ContainerComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: ContainerListComponent },
          { path: 'new', component: ContainerFormComponent },
          { path: 'edit/:id', component: ContainerFormComponent },
        ],
      },
      {
        path: 'organizations',
        component: OrganizationComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: OrganizationListComponent },
          { path: 'new', component: OrganizationFormComponent },
          { path: 'edit/:id', component: OrganizationFormComponent },
        ],
      },
      {
        path: 'business-codes',
        component: BussinessCodeComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: BussinessCodeListComponent },
          { path: 'new', component: BussinessCodeFormComponent },
          { path: 'edit/:id', component: BussinessCodeFormComponent },
        ],
      },
      {
        path: 'assignments',
        component: AssignmentComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: AssignmentListComponent },
          { path: 'new', component: AssignmentFormComponent },
        ],
      },
      {
        path: 'authorizations',
        component: AuthorizationComponent,
      },
      {
        path: 'import',
        component: ImportComponent,
      },
      {
        path: 'export',
        component: ExportComponent,
      },
    ],
  },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
