import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { UserService } from "src/sdk/custom/user.service";
import { Router } from "@angular/router";
import { AuthService } from "src/sdk/core/auth.service";
import { ToastController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import * as decode from "jwt-decode";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private storage: Storage
  ) {}
  loginForm: FormGroup;
  loading = false;

  ngOnInit() {
    this.formInitializer();
  }


  formInitializer() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  save() {
    this.loading = true;
    const loginData = this.loginForm.value;

    const obj = this.loginForm.value;
    obj["email"] = obj.email.toLowerCase();

    this.userService.userLogin(loginData).subscribe(
      async (data) => {
        this.loading = false;
        await this.authService.saveTokenToStorage(data.token);
        this.storage.get("token").then(async (token) => {
          const decodedToken = decode(token);
          console.log("login", decodedToken);
          
          const username = decodedToken.data.name
          await this.authService.saveNameToStorage(username);
        })

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
