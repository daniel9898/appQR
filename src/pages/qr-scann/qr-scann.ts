import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

@IonicPage()
@Component({
  selector: 'page-qr-scann',
  templateUrl: 'qr-scann.html',
})
export class QrScannPage {

  
  public scanSub : any;


  constructor(public navCtrl: NavController, 
			  public navParams: NavParams, 
			  private qrScanner: QRScanner) {
 
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
            
            this.qrScanner.hide(); // hide camera preview
           // (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
            this.scanSub.unsubscribe(); // stop scanning
            this.navCtrl.pop();
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

}
