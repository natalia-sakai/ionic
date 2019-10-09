import { EditarsenhaPage } from './../editarsenha/editarsenha.page';
import { EditardadosPage } from './../editardados/editardados.page';
import { AuthService } from '../../../services/auth.service';
import { ToastController, MenuController, AlertController, ActionSheetController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  lname:any;
  fname:any;
  email: any;

  constructor(private authService : AuthService, private modalController: ModalController) {
   }

  ngOnInit() {
    this.showuser();
  }
  
  showuser()
  {
    this.authService.user()
    .subscribe(
    data=>{ 
      this.fname = data.first_name.replace("\"", "");
      this.lname = data.last_name.replace("\"", "");
      this.email = data.email.replace("\"", "");
    }
    , error=>{ 
      console.log("error: " + error);
    });
  }

  async editardados(){
    const editardadosModal = await this.modalController.create({
      component: EditardadosPage,
    });
    return await editardadosModal.present();
  }

  async editarsenha(){
    const editarsenhaModal = await this.modalController.create({
      component: EditarsenhaPage,
    });
    return await editarsenhaModal.present();
  }
  

}
