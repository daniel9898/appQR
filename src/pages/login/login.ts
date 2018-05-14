import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,
         AlertController, LoadingController } from 'ionic-angular';

import { User } from '../../clases/usr';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
   
  email : string;
  clave : string;

  user : User;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private ofauth: AngularFireAuth,
              public utilities: UtilitiesProvider,
              private storage: Storage) {}

  async login(){

    this.utilities.showLoading(true);

    try{
          const infoUsr = await this.ofauth.auth.signInWithEmailAndPassword(this.email,this.clave);
          this.user = new User(infoUsr.email,infoUsr.email,infoUsr.uid);
          this.storage.set('usr',this.user);

          this.utilities.showToast('INGRESO EXITOSO !!');
          this.navCtrl.push("HomePage"); 
     
    }catch(e){

          this.utilities.dismissLoading();
          this.utilities.showAlert("Error : ",e.message); 
          console.log("ERROR : ",e);
    }
    
  }

  paginaRegistro(){

    this.utilities.showLoading(true);
    this.navCtrl.push('RegistroPage');

  }

}
