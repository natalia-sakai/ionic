import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-native-texttospeech',
  templateUrl: './component-native-texttospeech.page.html',
  styleUrls: ['./component-native-texttospeech.page.scss'],
})
export class ComponentNativeTexttospeechPage implements OnInit {

  textoASerFalado : string = 'Olá mundo';
  
  constructor(private tts : ComponentNativeTexttospeechPage) { }

  ngOnInit() {
  }
  /*
  falar(){
    this.tts.speak({
      text : this.textoASerFalado,
      locale: 'pt-BR',
      rate: 0.75
    })
    .then(()=>{
      alert('Falou com sucesso!');
    })
    .catch((erro : any)=>{
      alert(erro);
    })
  }*/
}
