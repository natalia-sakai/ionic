import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController, NavController } from '@ionic/angular';
import { RegisterPage } from '../auth/register/register.page';
import { LoginPage } from '../auth/login/login.page';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  constructor(
    private menu: MenuController,
    private authService: AuthService,
    private navCtrl: NavController,
  ) { 
    this.menu.enable(false);
  }

  //se estiver logado
  
  ionViewWillEnter() {
    
    this.authService.getToken().then(() => {
      if(this.authService.isLoggedIn) {
        this.navCtrl.navigateRoot('/dashboard');
      }
    });  
  }
  


  ngOnInit() {
    
  }
  /*ao clicar nos botoes de login ou register é construido um modal 
    o modal é composto pelas páginas já prontas de login e register
  */
  register() {
    this.navCtrl.navigateRoot('/register');
  }
  login() {
    this.navCtrl.navigateRoot('/login');
  }
}
