import { ComponentModalInternoPage } from './../component-modal-interno/component-modal-interno.page';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-component-modal',
  templateUrl: './component-modal.page.html',
  styleUrls: ['./component-modal.page.scss'],
})
export class ComponentModalPage implements OnInit {

  constructor(private modalCtrl : ModalController, private alertCtrl : AlertController) { }

  ngOnInit() {
  }

  async showModal(){
    let modal = await this.modalCtrl.create({
      component : ComponentModalInternoPage, //tem que declarar no module.ts
      componentProps : {nome: 'Natalia', idade : 19}
    });
    /*
    //Ao fechar o modal, pego o parametro que veio de lá
    modal.onDidDismiss();
    let alerta = await this.alertCtrl.create({
      header: 'Recebendo parametros',
      message: 'Nome: ' + nome + ' Idade: ' + idade
    });

    return await alerta.present();
*/
    return await modal.present();
}
    
}
