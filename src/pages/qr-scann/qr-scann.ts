import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { Storage } from '@ionic/storage';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { UtilitiesProvider } from '../../providers/utilities/utilities';

@IonicPage()
@Component({
  selector: 'page-qr-scann',
  templateUrl: 'qr-scann.html',
})
export class QrScannPage {

  
  public scanSub : any;


  constructor(public navCtrl: NavController, 
			  public navParams: NavParams, 
			  private qrScanner: QRScanner,
        private storage: Storage,
        public firebase : FirebaseProvider,
        public utils : UtilitiesProvider) {
 
  }

  ionViewDidLeave() {
    if (this.scanSub != null) {
      this.scanSub.unsubscribe();
    }
  }

  ionViewDidLoad() {

    console.log("Inicio QR");

    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      console.log("Result:",status);
      
      if (status.authorized) {
        // camera permission was granted

        this.qrScanner.show();
        // start scanning
        this.scanSub = this.qrScanner.scan().subscribe(
          (text: string) => {

            console.log('Scanned something', text);
            this.verificarSiElCodigoExiste(text);
         
            this.qrScanner.hide(); // hide camera preview
            this.scanSub.unsubscribe(); // stop scanning
       
        });

        // show camera preview
        this.qrScanner.show();

      } else if (status.denied) {
      	console.log('status.denied');
  
      } else {
      	console.log('ni denegado ni autor');
      }
    })
    .catch((e: any) => console.log('Error is', e));

  }

  async verificarSiElCodigoExiste(codigo : string){

    try{

        let querySnapshot = await this.firebase.querysDB('creditos', 'codigo', '==', codigo); 
        console.log("querySnapshot ",querySnapshot.empty);

        if(!querySnapshot.empty){
            querySnapshot.forEach(doc => {
            
              this.verificarSiElCodigoYaEstabaCargado(doc.data())
                  .then(ok => {
                     console.log("Usted a cargado saldo con exito");
                     //redirigir al listado
                  })
                  .catch(error => {
                     console.log(error);
                     this.utils.showAlert("Error",error);
                  })
          })
        }else{
          console.log("Codigo invalido reintente por favor");
          this.utils.showAlert("Informe :","Codigo invalido reintente por favor");
        }

    } catch(e){
      console.log("error en verificarSiElCodigoExiste ",e.message);
      this.utils.showAlert("Error",e.message);
    }

  }

  async verificarSiElCodigoYaEstabaCargado(qr : any){
    
    try{
        let usr = await this.storage.get('usr');
        console.log(usr,qr);
        let querySnapshot = await this.firebase.getRef('cargas').where("uid", "==" , usr.uid)
                                                                .where("codigo", "==" , qr.codigo).get();
        console.log("no lo cargo : ",querySnapshot.empty);
        if(querySnapshot.empty){
           let carga = { uid: usr.uid, codigo: qr.codigo };
           let result = await this.firebase.InsertarConIdAutomatico('cargas',carga);
           if(result.id != null){
              this.utils.showToast("USTED A CARGADO SALGO CON EXITO");
              this.qrScanner.hide(); // hide camera preview
              this.scanSub.unsubscribe(); // stop scanning
              this.goToPage('ListaPage');

           }
        }else{
          console.log("el codigo ya estaba cargado");
          this.utils.showAlert("Atención ! ","El codigo a sido cargado con anterioridad");
          this.qrScanner.hide(); // hide camera preview
          this.scanSub.unsubscribe(); // stop scanning
          this.goToPage('ListaPage');
        }

    }catch(e){
        console.log("ERROR en verificarSiElCodigoYaEstabaCargado");
        throw e.message;
    }
  }

  goToPage(page : string){
    this.navCtrl.push(page);
  }

}
