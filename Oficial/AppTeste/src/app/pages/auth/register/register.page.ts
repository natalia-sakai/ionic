import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { IfStmt, analyzeAndValidateNgModules } from '@angular/compiler';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  aux: number;
  public dataregister = NgForm; //armazena os dados para caso precise
  public formulario: any;
  public cargos:any[] = [];
  public ufs = 
  ['AC','AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
  constructor(private modalCtrl: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) 
  { 
    /*
    this.authService.getCargos().subscribe(
      data=>{ 
        this.cargos = data;
        for(let i=0; i<=25; i++){
          this.cargos[i];
          //console.log(this.cargos[i]);
        }
      }
      , error=>{ 
        console.log("error: " + error);
      });*/
  }

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
  auxtel:any;
  auxdata:any;
  daux:any;
  register(form: NgForm) {
    console.log(form.value);
    this.auxtel=form.value.telefone.replace(/\D+/g, '');
    this.auxdata=form.value.data_nasc;
    this.daux = this.auxdata.split('T')[0];
    console.log(this.daux);
    console.log(this.auxtel);
    if(form.value.password != form.value.password_s)
    {
      this.alertService.presentToast("Senha incorreta!");
    }
    else{
      this.authService.register(form.value.fName, form.value.lName, form.value.email, form.value.password, 
        this.daux, form.value.cargo, form.value.avental, this.auxtel, form.value.endereco, 
        form.value.cidade, form.value.estado).subscribe(
        data => {
          this.authService.login(form.value.email, form.value.password).subscribe(
            data => {
            },
            error => {
              this.alertService.presentToast("Verifique se você preencheu os campos corretamente corretamente");
            },
            () => {
              this.dismissRegister();
              this.navCtrl.navigateRoot('/dashboard');
            }
          );
          console.log(data);
        },
        error => {
          this.alertService.presentToast("Preencha todos os campos corretamente!");
        },
        () => {
          
        }
      );
    }
  }
}
