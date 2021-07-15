import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { GraphViewComponent } from './components/graph-view/graph-view.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ExpenseWalletComponent } from './components/expense-wallet/expense-wallet.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { APP_BASE_HREF } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoginMenuComponent } from './components/login-menu/login-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ToastrModule } from 'ngx-toastr';
import { API_BASE_URL, Client } from 'src/shared/service-proxies/client';
import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ChartsModule } from 'ng2-charts';
import { AdminLoginGuard } from 'src/shared/AdminLoginGuard';
import { UserLoginGuard } from 'src/shared/UserLoginGuard';

@NgModule({
  declarations: [
    AppComponent,
    GraphViewComponent,
    FileUploadComponent,
    ExpenseWalletComponent,
    ManageUsersComponent,
    NavigationComponent,
    LoginMenuComponent,
    LoginComponent,
    RegisterUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
    ChartsModule,
  ],
  providers: [
    HttpClient,
    Client,
    {
      provide: API_BASE_URL,
      useValue: 'https://expensebalanceapi.azurewebsites.net/',
    },
    AdminLoginGuard,
    UserLoginGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
