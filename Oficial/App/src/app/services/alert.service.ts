import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  
  /* esse serviço será responsável por enviar mensagens que são passadas por parametro */
  constructor(private toastCtrl : ToastController) { }

  async presentToast(message: any) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'top',
      translucent : true
    });
    toast.present();
  }
}
