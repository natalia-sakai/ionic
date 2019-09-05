import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-componentes',
  templateUrl: './componentes.page.html',
  styleUrls: ['./componentes.page.scss'],
})
export class ComponentesPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }
  abrirPagina(nomeDaPagina : string){
    // o this é pq é private e agr vc consegue utilizar as funcoes do navController
   switch (nomeDaPagina)
   {
     case '1': this.navCtrl.navigateForward('/component-action-sheet');
     break;
     case '2': this.navCtrl.navigateForward('/component-alert');
     break;
     case '3': this.navCtrl.navigateForward('/component-badges');
     break;
     case '4': this.navCtrl.navigateForward('/component-button');
     break;
     case '5': this.navCtrl.navigateForward('/component-card');
     break;
     case '6': this.navCtrl.navigateForward('/component-checkbox');
     break;
     case '7': this.navCtrl.navigateForward('/component-radio');
     break;
     case '8': this.navCtrl.navigateForward('/component-datatime');
     break;
     case '9': this.navCtrl.navigateForward('/component-fab');
     break;
     case '10': this.navCtrl.navigateForward('/component-input');
     break;
     case '11': this.navCtrl.navigateForward('/component-list');
     break;
     case '12': this.navCtrl.navigateForward('/component-loading');
     break;
     case '13': this.navCtrl.navigateForward('/component-modal');
     break;
     case '14': this.navCtrl.navigateForward('/component-range');
     break;
     case '15': this.navCtrl.navigateForward('/component-select');
     break;
     case '16': this.navCtrl.navigateForward('/component-slides');
     break;
     case '17': this.navCtrl.navigateForward('/component-spinner');
     break;
     case '18': this.navCtrl.navigateForward('/component-toast');
     break;
     case '19': this.navCtrl.navigateForward('/component-infinitscroll');
     break;
     case '20': this.navCtrl.navigateForward('/component-popover');
     break;
     case '21': this.navCtrl.navigateForward('/component-refresher');
     break;
     case '22': this.navCtrl.navigateForward('/component-searchbar');
     break;
     case '23': this.navCtrl.navigateForward('/component-toggle');
     break;
   }
 }
}
