import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { UserService } from "src/sdk/custom/user.service";
import { Router } from "@angular/router";
import { AuthService } from "src/sdk/core/auth.service";

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
    private authService: AuthService
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
    console.log("loginData", loginData);

    const obj = this.loginForm.value;
    obj["email"] = obj.email.toLowerCase();

    this.userService.userLogin(loginData).subscribe(
      async (data) => {
        console.log("got response from server", data);
        this.loading = false;
        await this.authService.saveTokenToStorage(data.token);
        this.router.navigate(["/home"], { queryParams: { login: true } });
      },
      (error) => {
        this.loading = false;
        console.log("This user doesnot exists. Please signup first", error);
      }
    );
  }
}
