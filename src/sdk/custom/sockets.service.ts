import { Injectable } from '@angular/core';
import { Socket } from "ngx-socket-io";
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class SocketsService {
  socketHost: string = 'http://localhost:3000';
  message = "";
  messages = [];
  currentUser = "";
  constructor(private socket: Socket,
    private toastCtrl: ToastController,) { }
  ngOnInit() {
    this.socket.connect();
    let name = `user-${new Date().getTime()}`;
    this.currentUser = name;
    this.socket.emit("set-name", name);
    this.socket.fromEvent("users-changed").subscribe((data) => {
      let user = data["user"];
      if (data["event"] === "left") {
        this.showToast("User left: " + user);
      } else {
        this.showToast("User joined: " + user);
        console.log(user);
      }
    });
    this.socket.fromEvent("message").subscribe((message) => {
      this.messages.push(message);
    });
    // console.log("hh", name);
    // this.socket.on("owner", (owner) => {
    //   console.log("status", owner);
    // });
  }

  async showToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      position: "top",
      duration: 2000,
    });
    toast.present();
  }


}
