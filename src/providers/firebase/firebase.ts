//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../clases/usr';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FirebaseProvider {
  
  //collection: AngularFirestoreCollection<any>;
  
  constructor(private ofauth: AngularFireAuth,
  	          private db: AngularFirestore) {
    
  }

  async authentication(user: any){
    return this.ofauth.auth.createUserWithEmailAndPassword(user.email, user.clave);
  }

  /*
  // CUANDO QUEREMOS GENERAR UN ID AUTOMATICO
  db.collection("cities").add({
      name: "Tokyo",
      country: "Japan"
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
      */
  

  async operationDB(operationName : string, collectionName: string, id?: string,  data?: any){

    switch (operationName) {
      case "getAll":
        return this.db.collection(collectionName).valueChanges();
      case "get":
        return this.db.collection(collectionName).doc(id).ref.get();
      case "insert":  //se podria verificar si es insert y id no esta definido generar id automatico
        return this.db.collection(collectionName).doc(id).ref.set(data);
      case "delete":
        return this.db.collection(collectionName).doc(id).ref.delete();
      case "update":
        return this.db.collection(collectionName).doc(id).ref.update(data);
      default:
        return "Operacion No valida";
    }
  }

  async querysDB( collectionName: string, field: string, oper: any, value: string){

    return this.db.collection(collectionName).ref.where(field, oper, value).get();
  }



}
