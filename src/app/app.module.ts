import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapwizeProvider } from '../providers/mapwize/mapwize';
import { DirectionsPageModule } from '../pages/directions/directions.module';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [MyApp, HomePage],
  imports: [BrowserModule, DirectionsPageModule,PipesModule ,IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage],
  providers: [StatusBar, SplashScreen, MapwizeProvider, { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }
