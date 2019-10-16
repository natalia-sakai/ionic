import { AlertService } from './../../../services/alert.service';
import { NgForm } from '@angular/forms';
import { AuthService } from './../../../services/auth.service';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editdados',
  templateUrl: './editdados.page.html',
  styleUrls: ['./editdados.page.scss'],
})
export class EditdadosPage implements OnInit {

  fname: any;
  lname: any;
  email: any;
  endereco: any;
  cidade: any;
  estado: any
  telefone: any;
  data_nasc: any;
  public id: any;
  constructor(private authService: AuthService, private alertService: AlertService, private navCtrl: NavController) { }

  ngOnInit() {
    this.showdados();
  }

  dismiss() {
    this.navCtrl.navigateRoot('/account');
  }

  showdados()
  {
    this.authService.user()
    .subscribe(
    data=>{ 
      this.fname = data.first_name.replace("\"", "");
      this.lname = data.last_name.replace("\"", "");
      this.email = data.email.replace("\"", "");
      this.endereco = data.endereco.replace("\"", "");
      this.cidade = data.cidade.replace("\"", "");
      this.estado = data.estado.replace("\"", "");
      this.telefone = data.telefone.replace("\"", "");
      this.data_nasc = data.data_nasc.replace("\"", "");
    }, error=>{ 
      console.log("error: " + error);
    });
  }

  editar(form: NgForm)
  {
    this.authService.getId()
    .subscribe(
    data=>{ 
      this.id = data.id;
      this.authService.updateuser(this.id,form.value.fName, form.value.lName, form.value.email, form.value.endereco, form.value.cidade, form.value.estado, form.value.data_nasc, form.value.telefone).subscribe(
        resp => {
        },
        error => {
          this.alertService.presentToast('E-mail já registrado!');
        },
        () => {
          this.alertService.presentToast('Usuário atualizado!');
          this.navCtrl.navigateRoot('/account');
        }
      );
    }
    , error=>{ 
      console.log("error: " + error);
    });

  }
}
