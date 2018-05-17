import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrScannPage } from './qr-scann';

@NgModule({
  declarations: [
    QrScannPage,
  ],
  imports: [
    IonicPageModule.forChild(QrScannPage),
  ],
})
export class QrScannPageModule {}
