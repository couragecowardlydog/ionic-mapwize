/**
 * @author Vivekanandna Sakthivelu
 * @created at 02 August 2018
 * @description Page to Show Map
 */
import { Component } from '@angular/core';
import { MapwizeProvider } from '../../providers/mapwize/mapwize';
import { ModalController } from 'ionic-angular';
import { DirectionsPage } from '../directions/directions';
import { Navigation } from '../../app/app.types';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public showMap: boolean;
  public showDirection: boolean;
  public direction: Navigation;
  constructor(private mapwize: MapwizeProvider, private modal: ModalController) {
    this.showMap = true;
    this.showDirection = false;
  }

  ionViewDidLoad() {
    this.mapwize.showMap().subscribe(response => {
      this.showMap = true;
    }, error => {
      this.showMap = false;
    });
  }

  //Open Modal to get source and destionation
  public getDirection() {
    let dialog = this.modal.create(DirectionsPage);
    dialog.present();
    dialog.onDidDismiss(directions => {
      //Get Directions from source to destination
      this.mapwize.getDirections(directions['start'], directions['destination']).then((result: Navigation) => {
        console.log(result);
        this.direction = result;
        this.showDirection = true;
      }).catch(error => {
        this.showDirection = false;
      });
    });
  }

  public stopDirection() {
    this.showDirection = !this.mapwize.stopNavigation();
  }

}
