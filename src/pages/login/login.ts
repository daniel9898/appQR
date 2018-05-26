import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,
         AlertController, LoadingController } from 'ionic-angular';

import { User } from '../../clases/usr';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
//import { QrScannPage } from '../qr-scann/qr-scann';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
   
  email : string;
  clave : string;
  viewInputScann : boolean = false;

  user : User;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private ofauth: AngularFireAuth,
              public utilities: UtilitiesProvider,
              private storage: Storage) {}

  async login(){

    this.utilities.showLoading();

    try{
          const infoUsr = await this.ofauth.auth.signInWithEmailAndPassword(this.email,this.clave);
          this.user = new User(infoUsr.email,infoUsr.email,infoUsr.uid);
        
          this.storage.set('usr',this.user);

          this.utilities.showToast('INGRESO EXITOSO !!');
          this.viewInputScann = true ;
          this.utilities.dismissLoading();
   
    }catch(e){

          this.utilities.dismissLoading();
          this.utilities.showAlert("Error : ",e.message); 
          console.log("ERROR : ",e);
    }
    
  }

  get toogleHeader(){
    return this.viewInputScann ? 'Click para Escanear' : 'Iniciar Sesión';
  }

  codigoQR() {
    //this.navCtrl.push('QrScannPage');
    this.navCtrl.push('ListaPage');
  }

  paginaRegistro(){

    this.utilities.showLoading(true);
    this.navCtrl.push('RegistroPage');

  }

  setLogin(em :string , cl :string){
    this.clave = cl;
    this.email = em;
  }

}
