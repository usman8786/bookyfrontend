import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/sdk/core/auth.service';
import { UserService } from 'src/sdk/custom/user.service';
import { Storage } from "@ionic/storage";
import * as decode from "jwt-decode";

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
    id:any
  ngOnInit() {
    this.formInitializer();
  }
  formInitializer() {
    this.changePasswordForm = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
  }
 async save() {
    this.loading = true;
    const data = this.changePasswordForm.value;
    const result = await this.storage.get("token")
      const decodedToken = decode(result);
      const userId = decodedToken.data._id;
      this.id = userId;
    this.userService.userChanges(data,this.id).subscribe(
      async (data) => {
        this.loading = false;
        this.router.navigate(["/home"]);
        this.ngOnInit();
      },
      (error) => {
        this.loading = false;
        console.log(error);
      }
    );
  }
}
