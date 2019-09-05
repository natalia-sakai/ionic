import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, ActionSheetController } from '@ionic/angular';
import { Button } from 'protractor';
import { AlertPromise } from 'selenium-webdriver';

@Component({
  selector: 'app-component-alert',
  templateUrl: './component-alert.page.html',
  styleUrls: ['./component-alert.page.scss'],
})
export class ComponentAlertPage implements OnInit {

  constructor(private alertCtrl : AlertController) { }

  ngOnInit() {
  }

  async abrirAlertSimples()
  {
    let AlertSimples = await this.alertCtrl.create({
      header: 'Alert Simples',
      subHeader: 'subtitulo não é necessário',
      message: 'This is an alert simple message.',
      buttons: ['OK']
    });
    await AlertSimples.present();
  }

  async abrirAlertComMultiplosBotoes()
  {
    const AlertMultiple = await this.alertCtrl.create({
      header: 'Alert Multiple',
      subHeader: 'subtitulo não é necessário',
      buttons: ['Cancelar', 'Abrir Modal', 'Excluir']
    });
    await AlertMultiple.present();
  } 

  async abrirAlertConfirmacao()
  {
    const AlertConfirm = await this.alertCtrl.create({
      header: 'Alert Confirm',
      // dá pra colocar css
      subHeader: 'Deseja cancelar o pedido BT21?',
      buttons: [
      {
        text: 'Cancelar',
        //role cancel deixa ele como segunda opcao
        role: 'cancel',
        cssClass: 'secondary',
        handler: ()=>{
          console.log('Pedido cancelado')
        }
      },
      {
        text: 'Pagar',
        handler: ()=>{
          console.log('Pedido processado!')
        }
      } 
    ]
  });
    await AlertConfirm.present();
  }
  
  async abrirPrompt()
  {
    let alertPrompt = await this.alertCtrl.create({
      header: 'Acesso restrito',
      inputs: [
        {
          name: 'login',
          type: 'text',
          placeholder: 'Informe seu login'
        },
        {
          name: 'senha',
          type: 'password',
          placeholder: 'Informe sua senha'
        }
      ],
      buttons: [
        {
          text: 'Novo',
          role:'cancel',
          cssClass: 'secondary',
          handler: ()=> {
            //aqui voce abre para a tela de cadastro
            console.log('cadastro')
          }
        },
        {
          text: 'Entrar',
          handler: (data)=> {
            //aqui voce abre para a tela de entrar
            console.log(data)
          }
        }
      ]
    });
    await alertPrompt.present();
  }
  async abrirRadio()
  {
    let alertRadio = await this.alertCtrl.create({
      header: 'Radio',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Radio 1',
          value: 'value1',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Radio 2',
          value: 'value2',
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Radio 3',
          value: 'value3',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          //role cancel deixa ele como segunda opcao
          role: 'cancel',
          cssClass: 'secondary',
          handler: ()=>{
            console.log('cancelado')
          }
        },
        {
          text: 'Ok',
          // no handler colocar uma variavel (pode ser qualquer nome) para pegar o valor q for marcado
          handler: (data)=>{
            console.log('processado',data)
          }
        } 
      ]
    });
    await alertRadio.present();
  }

  async abrirCheckbox()
  {
    let alertCheck = await this.alertCtrl.create({
      header: 'CheckBox',
      inputs: [
        {
          name: 'check1',
          type: 'checkbox',
          label: 'CheckBox 1',
          value: 'value1',
          checked: true
        },
        {
          name: 'check',
          type: 'checkbox',
          label: 'CheckBox 2',
          value: 'value2',
        },
        {
          name: 'check3',
          type: 'checkbox',
          label: 'CheckBox 3',
          value: 'value3',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          //role cancel deixa ele como segunda opcao
          role: 'cancel',
          cssClass: 'secondary',
          handler: ()=>{
            console.log('cancelado')
          }
        },
        {
          text: 'Ok',
          // no handler colocar uma variavel (pode ser qualquer nome) para pegar o valor q for marcado
          handler: (data)=>{
            console.log(data)
          }
        } 
      ]
    });
    await alertCheck.present();

    //await ....dismiss(); é usado para tela de load...
  }

  
}
