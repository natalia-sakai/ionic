import { HomePage } from './../home/home.page';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
})
export class LayoutPage implements OnInit {

  //toda vez que vc quiser usar algo, vc tem que colocar no construtor e ser importado la em cima
  //navController serve para poder navegar para outras paginas
  constructor(private navCtrl : NavController) { }

  ngOnInit() {
  }
  // as funções que são chamadas aqui são referentes a pagina layout

  /*
  abrirLayoutHeadereFooter(){
    this.navCtrl.navigateForward('/layout-header-footer');
  }*/

  abrirPagina(nomeDaPagina : string){
     // o this é pq é private e agr vc consegue utilizar as funcoes do navController
    switch (nomeDaPagina)
    {
      case '1': this.navCtrl.navigateForward('/layout-header-footer');
      break;
      case '2': this.navCtrl.navigateForward('/layout-tabs');
      break;
      case '3': this.navCtrl.navigateForward('/layout-menu');
      break;
      case '4': this.navCtrl.navigateForward('/layout-split-pane');
      break;
      case '5': this.navCtrl.navigateForward('/layout-grid');
      break;
      case '6': this.navCtrl.navigateForward('/layout-css-utilities');
      break;
    }
  }
}
