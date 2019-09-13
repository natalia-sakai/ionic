import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  // cada {} é um objeto que esta dentro do menu
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Instalação',
      url: '/instalacao',
      icon: 'alert'
    },
    {
      title: 'Layout',
      url: '/layout',
      icon: 'color-wand'
    },
    {
      title: 'Componentes',
      url: '/componentes',
      icon: 'filing'
    },
    {
      title: 'Componentes Nativos',
      url: '/componentes-nativos',
      icon: 'phone-portrait'
    },
    {
      title: 'Lista de tarefas',
      url: '/lista-tarefas',
      icon: 'list-box'
    },
    {
      title: 'API externa',
      url: '/api-externa',
      icon: 'wifi'
    },
    {
      title: 'Animações',
      url: '/animacoes',
      icon: 'color-palette'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
