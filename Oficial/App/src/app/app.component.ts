import { Component } from '@angular/core';
import { Platform, NavController, AlertController } from '@ionic/angular';
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
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private alertCtrl : AlertController
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
  // When Logout Button is pressed 
  async logout() {
    let alert = await this.alertCtrl.create({
      header: 'Deseja mesmo sair?',
      buttons: [
        {
          text: 'Não',
          role:'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Sim',
          handler: ()=>{
            this.authService.logout().subscribe(
              data => {
                this.alertService.presentToast(data['message']);        
              },
              error => {
                console.log(error);
              },
              () => {
                this.navCtrl.navigateRoot('/landing');
              }
            );
          } 
        }
      ]
    });
    await alert.present();
  }
}

