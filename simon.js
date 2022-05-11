const celeste =document.getElementById('celeste');
const violeta =document.getElementById('violeta');
const naranja =document.getElementById('naranja');
const verde =document.getElementById('verde');
const btnEmpezar = document.getElementById('btnEmpezar');
const ultimoNivel = 10;

class Juego{
  constructor(){
    this.inicializar();
    this.genSecuencia();
    setTimeout(this.siguienteNivel(),2000);
  }
  inicializar(){
    this.siguienteNivel = this.siguienteNivel.bind(this);
    this.elegirColor = this.elegirColor.bind(this);
    this.toggleBtnEmpezar();
    this.nivel = 1;
    this.colores={celeste,violeta,naranja,verde};
  }

  toggleBtnEmpezar(){
    if(btnEmpezar.classList.contains('hide')){
      btnEmpezar.classList.remove('hide');
    }else{
      btnEmpezar.classList.add('hide');
    }
  }

  genSecuencia(){
    this.secuencia= new Array(ultimoNivel).fill(0).map(n=> Math.floor(Math.random()*4));
  }

  siguienteNivel(){
    this.subNivel=0;
    setTimeout(()=>this.iluminar(),1000);
    this.eventosClick();
  
  }

  numeroColor(num){
    switch(num){
      case 0:
        return 'celeste'
      case 1:
        return  'violeta'
      case 2:
        return 'naranja'
      case 3: 
        return 'verde'     
    }
  }

  colorNumero(color){
    switch(color){
      case 'celeste':
        return 0
      case 'violeta':
        return 1
      case 'naranja':
        return 2
      case 'verde':
        return 3
    }

  }


  iluminar(){
    for (let i=0;i<this.nivel;i++){
      const color = this.numeroColor(this.secuencia[i]);
      setTimeout(()=>this.iluminarColor(color), 1000 * i);
    }
  }

  iluminarColor(color){
    this.colores[color].classList.add('light');
    setTimeout(()=>this.apagarColor(color), 350);
  }

  apagarColor(color){
    this.colores[color].classList.remove('light');
  }

  eventosClick(){
    this.colores.celeste.addEventListener('click',this.elegirColor);
    this.colores.verde.addEventListener('click',this.elegirColor);
    this.colores.violeta.addEventListener('click',this.elegirColor);
    this.colores.naranja.addEventListener('click',this.elegirColor);
  }

  eliminarClick(){
    this.colores.celeste.removeEventListener('click',this.elegirColor);
    this.colores.verde.removeEventListener('click',this.elegirColor);
    this.colores.violeta.removeEventListener('click',this.elegirColor);
    this.colores.naranja.removeEventListener('click',this.elegirColor);
  }

  elegirColor(ev){
    const nombreColor = ev.target.dataset.color
    const numeroDeColor = this.colorNumero(nombreColor);
    this.iluminarColor(nombreColor);
    if (numeroDeColor === this.secuencia[this.subNivel]){
      this.subNivel ++;
      if(this.subNivel===this.nivel){
        this.nivel++;
        this.eliminarClick();
        if (this.nivel ===(ultimoNivel +1)){
          alert("Completaste el juego");
          this.eliminarClick();
          this.inicializar();
        }else{
          setTimeout(this.siguienteNivel(),2000);
        }
      }
    }else{
      alert("Perdiste");
      this.eliminarClick();
      this.inicializar();
    }

  }
}


function empezarJuego(){
  window.juego = new Juego()
}
