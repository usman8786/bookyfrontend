import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/sdk/custom/books.service';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import {Storage} from '@ionic/storage'
import { AuthService } from 'src/sdk/core/auth.service';




@Component({
  selector: 'app-books',
  templateUrl: './allbooks.page.html',
  styleUrls: ['./allbooks.page.scss'],
})



export class BooksPage implements OnInit {  
  
  loading= false;
  deleteLoading = false;
  books: Books[] = []; 
  selectedBook: Books;
  
  
  constructor(
    private booksService: BooksService,
    private modalController: ModalController,
    private alertController: AlertController,
    private router: Router,
    private storage: Storage,
    private authService: AuthService
    ) { }
  
  ngOnInit() {
  }
 
  ionViewWillEnter(){
    this.getAll();

  }

  async getAll(){
    this.books.length = 0;
    const token = await this.authService.getTokenFromStorage();
    if(!token){   
    const alert = await this.alertController.create({
      header: 'Access Denied!',
      message: 'Please login first to access books',
      buttons: [
        {
          text: 'Login',
          handler: () => {
            this.router.navigateByUrl('/login')                
          }
        }    
      ]
    });
    await alert.present();
  }
  else{
    this.loading = true;
   const observable = await this.booksService.getAllBooks();
   observable.subscribe(
    data =>{    
    this.books = data.data.docs;
    this.loading = false;
    console.log('got response from server', data);
    },
    error =>{
      this.loading =false;
      console.log('error', error)
    }
  );
}
  }
}
interface Books {
  name: string;
  ibn: string;
  image_url: string;
  author: string;
  _id?: string;
  is_deleted: boolean;
}