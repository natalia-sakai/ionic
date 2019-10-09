import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { AlertService } from './../../../services/alert.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editarsenha',
  templateUrl: './editarsenha.page.html',
  styleUrls: ['./editarsenha.page.scss'],
})
export class EditarsenhaPage implements OnInit {

  public id: any;
  public password: any;
  constructor(private modalCtrl: ModalController, private alertService: AlertService, private authService: AuthService) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
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
        }
      );
    }
    , error=>{ 
      console.log("error: " + error);
    });
  }
}
