import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DirectionsPage } from './directions';
import { MapwizeProvider } from '../../providers/mapwize/mapwize';

@NgModule({
  declarations: [DirectionsPage],
  exports: [DirectionsPage],
  entryComponents: [DirectionsPage],
  imports: [IonicPageModule.forChild(DirectionsPage)],
  providers:[MapwizeProvider]
})
export class DirectionsPageModule { }
