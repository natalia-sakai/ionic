import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController, AlertController, ActionSheetController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  
  constructor(private navCtrl:NavController) { 

  }
  ngOnInit() {
  }
  
  financeiro()
  {
    this.navCtrl.navigateRoot('/financeiro');
  }
}