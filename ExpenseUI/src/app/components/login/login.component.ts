import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/shared/service-proxies/client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup = new FormGroup({
    userNameFormControl: new FormControl('', [Validators.required]),
    passwordFormControl: new FormControl('', [Validators.required]),
  });
  isLoading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private client: Client,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public login(): void {
    this.isLoading = true;
    this.client
      .login({
        username: this.loginFormGroup.controls.userNameFormControl.value,
        password: this.loginFormGroup.controls.passwordFormControl.value,
      })
      .subscribe(
        (res: any) => {
          this.client.setAuthToken(res.token, res.userRoles);

          if (res.userRoles[0] == 'Admin') {
            this.router.navigate(['/graph']);
          } else {
            console.log('Not admin user');
            this.router.navigate(['/expense']);
          }

          this.toastr.success('Successfully Logged In', 'Success !');
        },
        (err) => {
          this.isLoading = false;
          let apiError = JSON.parse(err.response);

          if (apiError.status === HttpStatusCode.Unauthorized) {
            this.toastr.error('Invalid UserName or Password', 'Error!');
            return;
          }
         
          console.log(apiError.message);
          this.toastr.error(`${apiError.message}`, 'Error!');
        },
        () => (this.isLoading = false)
      );
  }
}
