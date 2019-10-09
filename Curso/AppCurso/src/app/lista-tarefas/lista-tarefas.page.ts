import { AlertController, ToastController, ActionSheetController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-tarefas',
  templateUrl: './lista-tarefas.page.html',
  styleUrls: ['./lista-tarefas.page.scss'],
})
export class ListaTarefasPage implements OnInit {

  tasks: any[] = [];
  constructor(private alertCtrl : AlertController, private toastCtrl : ToastController, private actionSheetCtrl : ActionSheetController) { 
    let tasksJson = localStorage.getItem('taskbd');
    if(tasksJson != null){
      this.tasks = JSON.parse(tasksJson);
    }
  }

  ngOnInit() {
  }

  async abrirTeste()
  {
    let alertTeste = await this.alertCtrl.create({
      header: 'Teste de valor',
      inputs: [
        {
          name: 'taskToDo',
          type: 'text',
          placeholder: 'Informe algo'
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
        message: 'Informe algo!',
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
