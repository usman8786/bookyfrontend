import {
  AbstractControl,
  FormBuilder,
  Validators,
  EmailValidator,
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { UserService } from "../../sdk/custom/user.service";
import { AuthService } from "src/sdk/core/auth.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  constructor(
    private formbuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private storage: Storage
  ) {}

  registerForm: FormGroup;
  loading = false;
  ngOnInit() {
    this.formInitializer();
  }

  formInitializer() {
    this.registerForm = this.formbuilder.group({
      name: ["", [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      department: ["", [Validators.required]],
      designation: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(5)]],
      confirm_password: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          this.matchOtherValidator("password"),
        ],
      ],
    });
  }

  save() {
    this.loading = true;
    const obj = this.registerForm.value;
    obj["email"] = obj.email.toLowerCase();

    this.userService.userRegister(this.registerForm.value).subscribe(
      async (data) => {
        console.log("got response from server", data);
        this.loading = false;
        await this.authService.saveTokenToStorage(data.token);
        console.log("data.token", data.token);

        this.setToken();
        this.registerForm.reset();
      },
      (error) => {
        this.loading = false;
        console.log("error", error);
      }
    );
  }

  setToken() {
    const token = this.storage.get("token").then((token) => {
      if (token) {
        this.router.navigate(["/home"], { queryParams: { login: true } });
      } else {
        this.router.navigateByUrl("/register");
      }
    });
  }

  matchOtherValidator(otherControlName: string) {
    return (control: AbstractControl): { [key: string]: any } => {
      const otherControl: AbstractControl = control.root.get(otherControlName);

      if (otherControl) {
        const subscription: Subscription = otherControl.valueChanges.subscribe(
          () => {
            control.updateValueAndValidity();
            subscription.unsubscribe();
          }
        );
      }

      return otherControl && control.value !== otherControl.value
        ? { match: true }
        : null;
    };
  }
}
