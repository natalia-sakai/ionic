import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { AlertService } from './../../../services/alert.service';
import { ModalController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editsenha',
  templateUrl: './editsenha.page.html',
  styleUrls: ['./editsenha.page.scss'],
})
export class EditsenhaPage implements OnInit {

  public id: any;
  public password: any;
  constructor(private alertService: AlertService, private authService: AuthService, private navCtrl: NavController) { }

  ngOnInit() {
  }

  dismiss() {
    this.navCtrl.navigateRoot('/account');
  }

  editar(form: NgForm)
  {
    this.authService.getId()
    .subscribe(
    data=>{ 
      this.id = data.id;
      this.authService.checkpassword(this.id, form.value.password1).subscribe(
        resp => {
        },
        error => {
          this.alertService.presentToast('Senha Incorreta!');
        }
      );
      this.authService.updatepassword(this.id, form.value.password2).subscribe(
        resp => {
        },
        error => {
          this.alertService.presentToast('Senha Incorreta!');
        },
        () => {
          this.alertService.presentToast('Senha atualizada!');
          this.navCtrl.navigateRoot('/account');
        }
      );
    }
    , error=>{ 
      console.log("error: " + error);
    });

  }
}
