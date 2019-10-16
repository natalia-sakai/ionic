import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  public datalogin = NgForm; //armazena os dados do form para caso precise

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  landing() {
    this.navCtrl.navigateRoot('/landing');
  }
  async registerModal() {
    this.navCtrl.navigateRoot('/register');
  }

  login(form: NgForm) {
    this.authService.login(form.value.email, form.value.password).subscribe(
      data => {
        this.authService.token = data['access_token'];
        this.alertService.presentToast("Logado!");
      },
      error => {
        console.log(error);
        this.alertService.presentToast('E-mail ou senha incorretos');
      },
      () => {
        this.navCtrl.navigateRoot('/dashboard');
      }
    );
  }

}