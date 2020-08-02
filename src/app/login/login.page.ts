import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { UserService } from "src/sdk/custom/user.service";
import { Router } from "@angular/router";
import { AuthService } from "src/sdk/core/auth.service";
import { Socket } from "ngx-socket-io";
import { ToastController } from "@ionic/angular";
import { Storage } from "@ionic/storage";

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
    private socket: Socket,
    private toastCtrl: ToastController,
    private storage: Storage
  ) {}
  loginForm: FormGroup;
  loading = false;

  // message = "";
  // messages = [];
  // currentUser = "";

  // async ionViewWillEnter() {

  // }
  ngOnInit() {
    this.formInitializer();
    // const token = await this.storage.get("token");
    // console.log("got", token);
    // if (token) {
    //   console.log("if");

    // this.socket.connect();
    // let name = `user-${new Date().getTime()}`;
    // this.currentUser = name;
    // this.socket.emit("set-name", name);
    // this.socket.fromEvent("users-changed").subscribe((data) => {
    //   let user = data["user"];
    //   if (data["event"] === "left") {
    //     this.showToast("User left: " + user);
    //   } else {
    //     this.showToast("User joined: " + user);
    //     console.log(user);
    //   }
    // });
    // this.socket.fromEvent("message").subscribe((message) => {
    //   this.messages.push(message);
    // });
    // // console.log("hh", name);
    // // this.socket.on("owner", (owner) => {
    // //   console.log("status", owner);
    // // });
    // }
  }
  sendMessage() {
    const owner = "accepted";
    console.log("sent");
    this.socket.emit("send-message", owner);
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

  async showToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      position: "top",
      duration: 2000,
    });
    toast.present();
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
        this.ngOnInit();
        this.sendMessage();
      },
      (error) => {
        this.loading = false;
        console.log("This user doesnot exists. Please signup first", error);
      }
    );
  }
}
