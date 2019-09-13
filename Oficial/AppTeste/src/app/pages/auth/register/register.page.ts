import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { IfStmt } from '@angular/compiler';
import { async } from 'q';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  aux: number;

  constructor(private modalCtrl: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private alertCtrl : AlertController
  ) { }

  ngOnInit() {
  }

  // Dismiss Register Modal
  dismissRegister() {
    this.modalCtrl.dismiss();
  }

  // On Login button tap, dismiss Register modal and open login Modal
  async loginModal() {
    this.dismissRegister();
    const loginModal = await this.modalCtrl.create({
      component: LoginPage,
    });
    return await loginModal.present();
  }

  /*função para pegar o form*/
  register(form: NgForm) {
    //se for adm pede senha especial
    while(form.value.type == 0)
    {
      this.adm_confirmate();
      if(this.aux == null || this.aux == 0)
      {
        form.value.type = 1;
      }
    }
    while(form.value.password != form.value.password_s)
    {
      this.alertService.presentToast('Senhas não correspondentes!');
    }
    this.authService.register(form.value.fName, form.value.lName, form.value.email, form.value.password, form.value.type).subscribe(
      data => {
        this.authService.login(form.value.email, form.value.password).subscribe(
          data => {
          },
          error => {
            this.alertService.presentToast(data['error']);
          },
          () => {
            this.dismissRegister();
            this.navCtrl.navigateRoot('/dashboard');
          }
        );
        this.alertService.presentToast(data['message']);
      },
      error => {
        this.alertService.presentToast('Verifique se você preencheu todos os campos ou se o E-mail já está cadastrado');
      },
      () => {
        
      }
    );
  }

  async adm_confirmate()
    {
      let alertTeste = await this.alertCtrl.create({
        header: 'Informe a senha de administrador',
        inputs: [
          {
            name: 'senha_adm',
            type: 'text',
            placeholder: 'Password'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            //role cancel deixa ele como segunda opcao
            role: 'cancel',
            cssClass: 'secondary',
            handler:()=>{
            }
          },
          {
            text: 'Ok',
            handler: (form)=> {
              this.authService.verifica(form.senha_adm).subscribe(
                data => {
                  this.alertService.presentToast('Bem-vindo chefe!');
                  this.aux = 1;
                  return this.aux;
                },
                error =>{
                  this.alertService.presentToast('Senha incorreta!');
                  this.aux =0;
                  return this.aux;
                },
                () => {
                  
                }
              );
            }
          }
        ]
      });
      await alertTeste.present();
    }
}
