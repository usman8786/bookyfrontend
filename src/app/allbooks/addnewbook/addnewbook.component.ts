import { Component, OnInit, Input } from "@angular/core";
import {
  ModalController,
  ToastController,
  AlertController
} from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as decode from "jwt-decode";
import { Storage } from "@ionic/storage";

import { Router } from "@angular/router";
import { BooksService } from "src/sdk/custom/books.service";
import { AuthService } from "src/sdk/core/auth.service";

@Component({
  selector: "app-addnewbook",
  templateUrl: "./addnewbook.component.html",
  styleUrls: ["./addnewbook.component.scss"]
})
export class AddnewbookComponent implements OnInit {
  dataArray = [];
  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private booksService: BooksService,
    private router: Router,
    public toastController: ToastController,
    private storage: Storage,
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  addNewBookForm: FormGroup;
  loading = false;
  @Input() book;

  async ngOnInit() {
    this.formInitializer();
    if (this.book) {
      console.log("got book", this.book);
      this.addNewBookForm.patchValue(this.book);
    }
    var data = await this.authService.getBookFromStorage();
    if (data) {
      this.dataArray = data;
    }
    console.log(this.dataArray);
  }

  formInitializer() {
    this.addNewBookForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      cprice: [null, [Validators.required]],
      sprice: [null, [Validators.required]],
      is_deleted: [false, [Validators.required]]
    });
  }

  save() {
    this.loading = true;

    if (this.book) {
      this.updateBook();
    } else {
      this.addNew();
    }
  }

  async updateBook() {
    const observable = await this.booksService.updateBook(
      this.addNewBookForm.value,
      this.book._id
    );
    observable.subscribe(
      async data => {
        console.log("got response from server", data);
        const name = this.addNewBookForm.controls["name"].value;
        const toast = await this.toastController.create({
          message: `${name} has been updated successfully.`,
          duration: 3500
        });
        this.loading = false;
        toast.present();
        this.addNewBookForm.reset();

        this.modalCtrl.dismiss();
      },
      async error => {
        this.loading = false;
        this.dismiss();
      }
    );
  }

  async addNew() {
    const token = await this.storage.get("token");
    const decodedToken = decode(token);
    const obj = this.addNewBookForm.value;
    obj["user_id"] = decodedToken.data._id;

    const observable = await this.booksService.addNewBook(
      this.addNewBookForm.value
    );
    observable.subscribe(
      async data => {
        const name = this.addNewBookForm.controls["name"].value;
        const toast = await this.toastController.create({
          message: `${name} has been added Successfully.`,
          duration: 3500
        });
        this.loading = false;

        console.log(data.result);
        this.dataArray.push(data.result);

        this.booksService.addNewBook(obj);
        await this.authService.saveBookToStorage(this.dataArray);

        toast.present();
        this.addNewBookForm.reset();
        this.modalCtrl.dismiss();
      },
      async error => {
        const alert = await this.alertController.create({
          header: "No internet service available!",
          message: "Please check your internet service.",
          buttons: ["Okay"]
        });

        await alert.present();
        this.loading = false;
        console.log("error", error);
      }
    );
  }

  async checkCancel() {
    const alert = await this.alertController.create({
      header: "Confirm!",
      message: "Are you sure you want to go back?",
      buttons: [
        {
          text: "No",
          role: "no",
          cssClass: "secondary",
          handler: () => {
            console.log("No");
          }
        },
        {
          text: "Yes",
          handler: () => {
            this.dismiss();
          }
        }
      ]
    });
    await alert.present();
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
// Intefacing is Optional

interface Books {
  name: string;
  ibn: string;
  image_url: string;
  author: string;
  is_deleted: boolean;
  _id?: string;
}
