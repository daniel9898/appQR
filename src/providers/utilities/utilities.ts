import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController } from 'ionic-angular';



@Injectable()
export class UtilitiesProvider {

  private loading : any;

  constructor(private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {}

  showAlert(title:string, msj : string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msj,
      buttons: ['Cancelar']
    });
    alert.present();
  }

  showToast(msg : string, dismissFunction?: any) {

    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top',
      cssClass: './toast.scss'
    });
    toast.onDidDismiss((dismissFunction) ? dismissFunction() : "" );
    toast.present();
  }

  showLoading(dismissOnPageChange? : boolean){
    this.loading = this.loadingCtrl.create({
      content: 'Por favor espere...',
      dismissOnPageChange: (dismissOnPageChange != null) ? dismissOnPageChange : false
    });

    this.loading.present();
  }

  dismissLoading(){
    this.loading.dismiss();
  }

}
