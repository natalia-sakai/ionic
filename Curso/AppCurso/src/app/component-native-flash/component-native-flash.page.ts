import { Component, OnInit } from '@angular/core';
import { Flashlight } from '@ionic-native/flashlight/ngx';

@Component({
  selector: 'app-component-native-flash',
  templateUrl: './component-native-flash.page.html',
  styleUrls: ['./component-native-flash.page.scss'],
})
export class ComponentNativeFlashPage implements OnInit {

  constructor(private flashlight : Flashlight) { }

  ngOnInit() {
  }
  
  ligarflash(){
    this.flashlight.switchOn();
  }

  desligarflash(){
    this.flashlight.switchOff();
  }
}
