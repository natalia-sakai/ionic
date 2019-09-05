import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-component-loading',
  templateUrl: './component-loading.page.html',
  styleUrls: ['./component-loading.page.scss'],
})
export class ComponentLoadingPage implements OnInit {

  constructor(private loadingCtrl : LoadingController) { }

  ngOnInit() {
  }

  async showLoadingDefault(){
    let loading = await this.loadingCtrl.create({
      message : 'Processando...',
      duration: 2000
    });

    return await loading.present();
  }

  async showLoadingCustomizeSpinner1(){
    let loading = await this.loadingCtrl.create({
      spinner : 'lines',
      message : 'Processando...',
      duration: 1500, //milisegundos
    });

    return await loading.present();
  }
  async showLoadingCustomizeSpinner2(){
    let loading = await this.loadingCtrl.create({
      spinner : 'lines-small',
      message : 'Processando...',
      duration: 1500, //milisegundos
    });

    return await loading.present();
  }
  async showLoadingCustomizeSpinner3(){
    let loading = await this.loadingCtrl.create({
      spinner : 'dots',
      message : 'Processando...',
      duration: 1500, //milisegundos
    });

    return await loading.present();
  }
  async showLoadingCustomizeSpinner4(){
    let loading = await this.loadingCtrl.create({
      spinner : 'bubbles',
      message : 'Processando...',
      duration: 1500, //milisegundos
    });

    return await loading.present();
  }
  async showLoadingCustomizeSpinner5(){
    let loading = await this.loadingCtrl.create({
      spinner : 'circles',
      message : 'Processando...',
      duration: 1500, //milisegundos
    });

    return await loading.present();
  }
  async showLoadingCustomizeSpinner6(){
    let loading = await this.loadingCtrl.create({
      spinner : 'crescent',
      message : 'Processando...',
      duration: 1500, //milisegundos
    });

    return await loading.present();
  }

  async showLoadingCustomizeTranslucent(){
    let loading = await this.loadingCtrl.create({
      message : 'Translucent',
      duration: 1500, //milisegundos
      translucent: true,
    });

    return await loading.present();
  }

  async showLoadingConsumindoApi(){
    let loading = await this.loadingCtrl.create({
      message : 'Requisição para o servidor',
    });

    //Simulando o tempo de resposta da api
    //ex: requisição http para o servido
    setTimeout(()=>{
      console.log('Servidor respondeu')
      loading.dismiss();
    }, 5000);

    console.log('Fiz uma requisição para o servidor')
    return await loading.present();
  }

}
