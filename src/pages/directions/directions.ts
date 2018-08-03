import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { MapwizeProvider } from '../../providers/mapwize/mapwize';
import { TextInput } from 'ionic-angular';
import * as _ from 'lodash';
@IonicPage()
@Component({
  selector: 'page-directions',
  templateUrl: 'directions.html',
})
export class DirectionsPage {
  public places: Array<any>;
  @ViewChild('start') start: TextInput;
  @ViewChild('destinaton') destinaton: TextInput;
  public context: string;
  public direction: any = {};
  constructor(public mapwize: MapwizeProvider, public viewCtrl: ViewController, public zone: NgZone) {
    this.places = new Array<any>();
    this.context = 'START';
    this.direction.start = '';
    this.direction.destination = '';
  }

  ionViewDidLoad() {
    this.places = this.mapwize.getAvailableLocations();
    this.setStartFocus();
  }

  private setStartFocus() {
    this.context = 'START';
    this.start.setFocus();
  }

  private setDestinationFocus() {
    this.context = 'DEST';
    this.destinaton.setFocus();
  }

  public onSelectPlace(place) {
    switch (this.context) {
      case 'START':
        this.direction['start'] = place;
        this.setDestinationFocus();
        break;
      case 'DEST':
        this.direction['destination'] = place;
        if (!this.direction['destination']['name'])
          this.setStartFocus();
        break;
    }
    if (this.direction['start']['name'] && this.direction['destination']['name'])
      this.dismiss();
  }

  private dismiss() {
    this.viewCtrl.dismiss(this.direction);
  }

  public switch() {
    this.zone.run(() => {
      let temp = _.cloneDeep(this.direction['start']);
      this.direction['start'] = _.cloneDeep(this.direction['destination']);
      this.direction['destination'] = temp;
    });
  }
}
