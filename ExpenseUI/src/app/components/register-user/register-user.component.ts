import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Client, RegisterModel } from 'src/shared/service-proxies/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent {
  registerFormGroup: FormGroup = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    userNameFormControl: new FormControl('', [Validators.required]),
    passwordFormControl: new FormControl('', [Validators.required]),
  });

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private client: Client
  ) {}

  public registerUser(): void {
    this.client
      .register({
        email: this.registerFormGroup.controls.emailFormControl.value,
        username: this.registerFormGroup.controls.userNameFormControl.value,
        password: this.registerFormGroup.controls.passwordFormControl.value,
      })
      .subscribe(
        (response: any) => {
          console.log(response);
          this.toastr.success(`User Registered Successfully!!!`, 'Success!');
          this.router.navigate(['/login']);
        },
        (err) => {
          let message = JSON.parse(err.response).message;
          console.log(message);
          this.toastr.error(`${message}`, 'Error!');
        }
      );
  }
}
