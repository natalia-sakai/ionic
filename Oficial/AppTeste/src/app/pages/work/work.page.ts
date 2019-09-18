import { AuthService } from 'src/app/services/auth.service';
import { MenuController, ToastController, AlertController, ActionSheetController } from '@ionic/angular';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work',
  templateUrl: './work.page.html',
  styleUrls: ['./work.page.scss'],
})
export class WorkPage implements OnInit {

  user: User;
  tasks: any[] = [];

  constructor(private menu: MenuController, private authService: AuthService, private toastCtrl : ToastController, private alertCtrl : AlertController, private actionSheetCtrl : ActionSheetController) {
    this.menu.enable(true);
    let tasksJson = localStorage.getItem('taskbd');
    if(tasksJson != null){
      this.tasks = JSON.parse(tasksJson)
    }
   }

  ngOnInit() {
  }
  
  async abrirTeste()
  {
    let alertTeste = await this.alertCtrl.create({
      header: 'Adicionar tarefa',
      inputs: [
        {
          name: 'taskToDo',
          type: 'text',
          placeholder: 'tarefa a fazer'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          //role cancel deixa ele como segunda opcao
          role: 'cancel',
          cssClass: 'secondary',
          handler: ()=>{
            console.log('cancelado')
          }
        },
        {
          text: 'Ok',
          handler: (form)=> {
            console.log(form),
            this.add(form.taskToDo);
          }
        }
      ]
    });
    await alertTeste.present();
  }

  async add(taskToDo : string){
    // se nao tiver valor
    if(taskToDo.trim().length <1){
      const toast = await this.toastCtrl.create({
        message: 'Digite alguma informação!',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      return;
    }
    let task = {name: taskToDo, done: false};
    this.tasks.push(task);
    this.updateLocalStorage();
  }

  async openActions(task : any){
    const actionSheet = await this.actionSheetCtrl.create({
      header: "O que deseja fazer?",
      buttons: [{
        text: task.done ? 'Desmarcar' : 'Marcar',
        icon: task.done ? 'radio-button-off' : 'checkmark-circle',
        handler:() => {
          task.done = !task.done;
          this.updateLocalStorage();
        }
      },
      {
        text: 'Cancelar',
        icon:'close',
        //role cancel deixa ele como segunda opcao
        role: 'cancel',
        handler: ()=>{
          console.log('cancelado')
        }
      }]
    });
    await actionSheet.present();
  }

  updateLocalStorage(){
    // JSON transforma em string
    localStorage.setItem('taskbd', JSON.stringify(this.tasks));
  }

  delete(task : any){
    this.tasks = this.tasks.filter(taskArray => task != taskArray);
    this.updateLocalStorage();
  }
}
