import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-input',
  templateUrl: './component-input.page.html',
  styleUrls: ['./component-input.page.scss'],
})
export class ComponentInputPage implements OnInit {
  // array do tipo string
  frutas : string[] =['Abacate', 'Maça', 'Manga'];

  constructor() { }

  ngOnInit() {
  }

}
