import { AlertService } from './../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController, AlertController, ActionSheetController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Button } from 'protractor';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  id:any;
  data_r:any;
  public disabled = true;
  public havedata = false;
  texts: any[] = [];

  constructor(private navCtrl:NavController, private authService: AuthService, private alertService: AlertService) { 
    this.showdata();
  }
  ngOnInit() {
    
  }

  

  resposta(resp: Number)
  {
    this.authService.getId().then(() => {
        this.id = this.authService.id;
    });

    this.authService.confirma_presenca(this.id, resp).subscribe(
      data => {
        
      },
      error => {
        console.log(error);
      },
      () => {
        this.alertService.presentToast('Confirmação enviada!');
        this.disabled = true; //desabilita o botão
      }
    );
  }

  showdata()
  {/*
    this.authService.getReuniao().subscribe((data)=>{
      this.data_r = data;
    });
    console.log(this.data_r);

    //se tiver reunião habilita
    if(this.data_r != null)
    {
      this.havedata=true;
      this.disabled=false;
    }
    */
  }
}