import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginGuard } from 'src/shared/AdminLoginGuard';
import { UserLoginGuard } from 'src/shared/UserLoginGuard';
import { ExpenseWalletComponent } from './components/expense-wallet/expense-wallet.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { GraphViewComponent } from './components/graph-view/graph-view.component';
import { LoginComponent } from './components/login/login.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';

const routes: Routes = [
  { path: '', component: LoginComponent, data: { title: 'Login Component'} },
  { path: 'graph', component: GraphViewComponent, data: { title: 'Graph View'}, canActivate: [AdminLoginGuard] },
  { path: 'upload', component: FileUploadComponent, data: { title: 'File Upload'}, canActivate: [AdminLoginGuard] },
  { path: 'expense', component: ExpenseWalletComponent, data: { title: 'Expense Wallet'}, canActivate: [UserLoginGuard] },
  { path: 'user', component: ManageUsersComponent, data: { title: 'Manage Users'}, canActivate: [AdminLoginGuard] },
  { path: 'login', component: LoginComponent, data: { title: 'Login'} },
  { path: 'register', component: RegisterUserComponent, data: { title: 'Register User'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
