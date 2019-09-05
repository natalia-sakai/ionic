import { Component, OnInit } from '@angular/core';
import { ToastController } from '../../../node_modules/@ionic/angular';

@Component({
  selector: 'app-component-toast',
  templateUrl: './component-toast.page.html',
  styleUrls: ['./component-toast.page.scss'],
})
export class ComponentToastPage implements OnInit {

  constructor(private toastCtrl : ToastController) { }

  ngOnInit() {
  }

  async showToast(){
    let toast = await this.toastCtrl.create({
      message: 'Enviada via toast.',
      duration: 2000
    });

    toast.present();
  }

  async showToastPositionTop(){
    let toast = await this.toastCtrl.create({
      message: 'Enviada via toast.',
      position: 'top',
      duration: 2000
    });

    toast.present();
  }
  async showToastPositionBottom(){
    let toast = await this.toastCtrl.create({
      message: 'Enviada via toast.',
      position: 'bottom',
      duration: 2000
    });

    toast.present();
  }
  async showToastPositionMiddle(){
    let toast = await this.toastCtrl.create({
      message: 'Enviada via toast.',
      position: 'middle',
      duration: 2000
    });

    toast.present();
  }

  async showToastButton(){
    let toast = await this.toastCtrl.create({
      message: 'Enviada via toast.',
      position: 'top',
      showCloseButton: true
    });

    toast.present();
  }

  async showToastButtonText(){
    let toast = await this.toastCtrl.create({
      message: 'Enviada via toast.',
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'Fechar'
    });

    toast.present();
  }

  async showToastButtonTextLong(){
    let toast = await this.toastCtrl.create({
      message: 'Ao finalizar o curso de ionic, você receberá cupons de desconto em qualquer curso do instrutor.',
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'Fechar'
    });

    toast.present();
  }
  
  async showToastButtonTextLongTranslucent(){
    let toast = await this.toastCtrl.create({
      message: 'Ao finalizar o curso de ionic, você receberá cupons de desconto em qualquer curso do instrutor.',
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'Fechar',
      translucent : true
    });

    toast.present();
  }
}
