import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-checkbox',
  templateUrl: './component-checkbox.page.html',
  styleUrls: ['./component-checkbox.page.scss'],
})
export class ComponentCheckboxPage implements OnInit {
  // array
  meses: any[] = [
    {nome: 'Janeiro', valor: 1, marcado: false},
    {nome: 'Fevereiro', valor: 2, marcado: true},
    {nome: 'Março', valor: 3, marcado: false},
    {nome: 'Abril', valor: 4, marcado: true}
  ];

  constructor() { }

  ngOnInit() {
    // quando o console abrir ele vai carregar esse array
    console.log(this.meses);
  }

  exibirMeses(){
    // dessa forma vai exibir o array
    //console.log(this.meses); 
    // usando o table ele ja tabula o array pra facilitar a visualização
    console.table(this.meses);
  }
  
}
