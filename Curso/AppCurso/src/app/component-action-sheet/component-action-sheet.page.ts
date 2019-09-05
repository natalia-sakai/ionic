import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-component-action-sheet',
  templateUrl: './component-action-sheet.page.html',
  styleUrls: ['./component-action-sheet.page.scss'],
})
export class ComponentActionSheetPage implements OnInit {

  constructor(private ActionSheetCtrl : ActionSheetController) { }

  ngOnInit() {
  }
  
  async abrirActionSheet()
  {

    let actionSheet = await this.ActionSheetCtrl.create({
      //titulo
      header: 'Albums',
      // define como vai ser os botoes
      buttons: [{
        text: 'Deletar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          //pode colocar um alert aqui tbm
          console.log('Excluir');
        }
      }, 
      {
        text: 'Compartilhar',
        icon: 'share',
        handler: () => {
          console.log('Compartilhar');
        }
      }, 
      {
        text: 'Assistir',
        icon: 'arrow-dropright-circle',
        handler: () => {
          console.log('Assistir');
        }
      }, 
      {
        text: 'Favoritar',
        icon: 'heart',
        handler: () => {
          console.log('Favoritar');
        }
      }, 
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancelar');
        }
      }]
    });
    await actionSheet.present();
  }
}
