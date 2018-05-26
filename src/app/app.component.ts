import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import {timer} from 'rxjs/observable/timer' ;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = LoginPage;
  showSplash = true;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.appInit();
  }

    appInit(){

      this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      timer(1000).subscribe(() =>{
         this.showSplash = false;
      })

    });
   
  }
}

