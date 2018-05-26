import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { UtilitiesProvider } from '../../providers/utilities/utilities';

@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {

  lista = [];
  usrName : string;
  SaldoTotal : string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              public firebase : FirebaseProvider,
              public utils : UtilitiesProvider) {

  	this.mostrarListaDeCargas();
  }


  async mostrarListaDeCargas(){

  	try{
  		let usr = await this.storage.get('usr');
  		this.usrName = usr.nombre;
  		let cargas = await this.firebase.getRef('cargas').where("uid", "==" , usr.uid).get();
  		console.log('codigos cargados por el usr', cargas.empty);

  		if(!cargas.empty){
  		 	let creditos = await this.firebase.getRef('creditos').get();
  		 	console.log('codigos en DB', creditos.empty);
  		 	if(!creditos.empty){
                let cont = 0;
	            cargas.forEach( carga => {
	              	creditos.forEach( credito => {

	              	  	if(carga.data().codigo == credito.data().codigo){
	              	  		cont += parseInt(credito.data().valor);
                            this.lista.push({valor: credito.data().valor});
	                    }

	                    this.SaldoTotal = 'Su saldo total es : $ '+cont;
	              	})
	 
	            })  


  		 	}
  		}
         
  	}catch(e){
       this.utils.showAlert("Atención ",e.message);
  	}
  	
  }

}
