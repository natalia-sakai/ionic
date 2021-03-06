import { AlertService } from './../../../services/alert.service';
import { NgForm } from '@angular/forms';
import { AuthService } from './../../../services/auth.service';
import { ModalController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editardados',
  templateUrl: './editardados.page.html',
  styleUrls: ['./editardados.page.scss'],
})
export class EditardadosPage implements OnInit {

  fname: any;
  lname: any;
  email: any;
  endereco: any;
  cidade: any;
  estado: any
  telefone: any;
  data_nasc: any;
  public id: any;
  constructor(private modalCtrl: ModalController, private authService: AuthService, private alertService: AlertService) { }

  ngOnInit() {
    this.showdados();
  }

  dismiss() {
    this.modalCtrl.dismiss();
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
        }
      );
    }
    , error=>{ 
      console.log("error: " + error);
    });

  }
}
