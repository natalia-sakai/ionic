import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/dashboard',
      icon: 'home'
    },
    {
      title: 'Lista de presença',
      url: '/presenca',
      icon: 'list-box'
    },
    {
      title: 'Informativos',
      url: '/informativos',
      icon: 'paper'
    },
    {
      title: 'Ágape',
      url: '/agape',
      icon: 'list'
    },
    {
      title: 'Ordem do dia',
      url: '/ordem',
      icon: 'today'
    },
    {
      title: 'Financeiro',
      url: '/financeiro',
      icon: 'cash'
    },
    {
      title: 'Work to do',
      url: '/work',
      icon: 'bookmark'
    },
    {
      title: 'My account',
      url: '/account',
      icon: 'contact'
    },
    {
      title: 'Logout',
      url: '/logout',
      icon: 'log-out'
    }

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
       // Commenting splashScreen Hide, so it won't hide splashScreen before auth check
      //this.splashScreen.hide();
     this.authService.getToken();

    });
  }

}
