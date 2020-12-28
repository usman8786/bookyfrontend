import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/sdk/core/auth.service';
import { UserService } from 'src/sdk/custom/user.service';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-namechange',
  templateUrl: './namechange.page.html',
  styleUrls: ['./namechange.page.scss'],
})
export class NamechangePage implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private storage: Storage
  ) {}
  changePasswordForm: FormGroup;
  loading = false;

  ngOnInit() {
    this.formInitializer();
  }


  formInitializer() {
    this.changePasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  save() {
    this.loading = true;
    const loginData = this.changePasswordForm.value;

    const obj = this.changePasswordForm.value;
    obj["email"] = obj.email.toLowerCase();

    this.userService.userLogin(loginData).subscribe(
      async (data) => {
        this.loading = false;
        await this.authService.saveTokenToStorage(data.token);
        this.router.navigate(["/home"], { queryParams: { login: true } });
        this.ngOnInit();
      },
      (error) => {
        this.loading = false;
        console.log(error);
      
      }
    );
  }
}
