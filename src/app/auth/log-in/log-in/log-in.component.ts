import { ApiResponse, UserLogin } from './../../../core/model/user-login';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ApiStatus } from 'src/app/core/enums/enums';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private route: Router
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    if (this.localStorageService.isLoggedIn()) {
      this.route.navigate(['']);
    }
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submitForm() {
    if (this.authService.requestedUrl == '/login')
      this.authService.requestedUrl = '';
    if (this.loginForm.invalid) {
      for (const i in this.loginForm.controls) {
        this.loginForm.controls[i].markAsDirty();
        this.loginForm.controls[i].updateValueAndValidity();
      }
      return;
    }

    let model: UserLogin = new UserLogin();
    model.username = this.val['username'].value;
    model.password = this.val['password'].value;

    this.authService.login(model).subscribe(
      (res: ApiResponse) => {
        if (res.status == ApiStatus.SUCCESS) {
          if (res.data && res.data.isDeleted == false) {
            this.localStorageService.setUser(res.data);
            if (this.authService.requestedUrl) {
              this.route.navigate([this.authService.requestedUrl]);
            } else {
              this.route.navigate(['']);
            }
            this.loginForm.reset();
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  get val() {
    return this.loginForm.controls;
  }
}
