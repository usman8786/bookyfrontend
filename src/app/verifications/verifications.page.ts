import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { UserService } from "src/sdk/custom/user.service";
import { Router } from "@angular/router";
import { AuthService } from "src/sdk/core/auth.service";
import { VerifyComponent } from "./verify/verify.component";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-verifications",
  templateUrl: "./verifications.page.html",
  styleUrls: ["./verifications.page.scss"],
})
export class VerificationsPage implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private modalController: ModalController
  ) {}
  loginForm: FormGroup;
  loading = false;

  ngOnInit() {
    this.formInitializer();
  }

  formInitializer() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  send() {
    this.loading = true;
    const loginData = this.loginForm.value;
    console.log("loginData", loginData);

    const obj = this.loginForm.value;
    obj["email"] = obj.email.toLowerCase();

    this.userService.sendEmail(loginData).subscribe(
      async (data) => {
        console.log("got response from server", data);
        this.loading = false;
        // await this.authService.saveTokenToStorage(data.token);
        // this.router.navigate(["/home"], { queryParams: { login: true } });
        const id = data.id;
        const modal = await this.modalController.create({
          component: VerifyComponent,
          componentProps: { id },
        });
        console.log(data.id);

        modal.onDidDismiss().then((data) => {});

        return await modal.present();
      },
      (error) => {
        this.loading = false;
        console.log("This user doesnot exists. Please signup first", error);
      }
    );
  }
}
