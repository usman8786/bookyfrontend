import { Subscription } from "rxjs";
import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { UserService } from "src/sdk/custom/user.service";
import { Router } from "@angular/router";
import { AuthService } from "src/sdk/core/auth.service";
import { ActivatedRoute } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { ResourceLoader } from "@angular/compiler";
@Component({
  selector: "app-verify",
  templateUrl: "./verify.component.html",
  styleUrls: ["./verify.component.scss"],
})
export class VerifyComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private modalCtrl: ModalController,
    private route: ActivatedRoute
  ) {}
  @Input() id;
  loginForm: FormGroup;
  loading = false;

  ngOnInit() {
    this.formInitializer();
  }

  formInitializer() {
    this.loginForm = this.formBuilder.group({
      verificationCode: [null, [Validators.required]],
    });
  }

  send() {
    this.loading = true;
    const loginData = this.loginForm.value;
    console.log("loginData", loginData);
    console.log("recivced id", this.id);

    const obj = loginData;
    obj["userId"] = this.id;
    console.log("obj", obj);

    const observable = this.userService
      .sendCode(obj)
      .subscribe(async (data) => {
        console.log("got response from server", data);
        console.log("sent", observable);
      });
    this.router.navigateByUrl("/register");
    this.modalCtrl.dismiss();
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
}
