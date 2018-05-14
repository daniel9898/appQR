import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../clases/usr';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { UtilitiesProvider } from '../../providers/utilities/utilities';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  usr : User;
 
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public firebaseService: FirebaseProvider,
              public utilities: UtilitiesProvider,
              private storage: Storage) {

    this.usr = new User();
  }

  registrarse(){

    this.utilities.showLoading();
    this.firebaseService.authentication(this.usr)
       .then(result =>{

         this.utilities.showToast("REGISTRO EXITOSO !!");
         let usr = this.usr.formatUser(this.usr, result);
         this.saveUser(usr);
         this.utilities.dismissLoading();

       })
       .catch(error =>{

         this.utilities.dismissLoading();
         this.utilities.showAlert("Informe de registro",error.message);
         
       });
  }

  saveUser(usr){

    this.firebaseService.operationDB("insert", "usuarios", usr.uid, usr)
      .then(result => {
        this.storage.set('usr', usr);
        this.navCtrl.push("HomePage")
      })
      .catch(error => this.utilities.showAlert("Error al guardar el usuario",error.message));
  }

  getUser(collectionName: string, id: string){
    this.firebaseService.operationDB("get", collectionName, id)
      .then(doc =>{
        //if(doc.exists)
          console.log("un usr ",doc);
        //else{
          console.log("error el usr es null");
        
       //}
      })
      .catch(error =>{
        console.log("error un usr ",error);
    })
  }

  getAllUser(collectionName: string){
    this.firebaseService.operationDB("getAll",collectionName)
      .then(docs =>{
          /*docs.forEach((doc) => {
             console.log(doc.id, " => ", doc.data());
          });*/
      })
      .catch(error =>{
        console.log("error all traer todos los usuarios ",error);
    })
  }

  deleteUser(id: string){
    this.firebaseService.operationDB("delete","usuarios",id)
      .then(() =>{ console.log("documento borrado con exito"); })
      .catch(error =>{
        console.log("error al borrar el usr ",error);
    })
  }

  updateUser(id: string, data: any){
    this.firebaseService.operationDB("update","usuarios",id,data)
      .then(() =>{ console.log("user actualizado con exito"); })
      .catch(error =>{
        console.log("error al actualizar el usr ",error);
    })
  }
  
}
