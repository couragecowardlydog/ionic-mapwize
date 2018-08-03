/**
 * @author Vivekanandan Sakthivelu
 * @created 02 August 2018
 * @description Mapwize API Implementation
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Object, Navigation } from '../../app/app.types';
let mapwize = window['Mapwize'];
@Injectable()
export class MapwizeProvider {
  //API Key Obtained from Mapwize Console
  private MAPWIZE_API_KEY: string = '<MAPWIZE_API_KEY>'
  //Venue ID Obtained during creation of Venue
  private MAPWIZE_VENUE: string = '<MAPWIZE_VENUE>';
  //ID of `div` to show map
  private MAPWIZE_HOST: string = 'mapwize'
  //Instance of Map 
  private mapInstance: any;
  //Current Zoom 
  private MAP_ZOOM: number;
  //Current Floor
  private VENUE_FLOOR: number;
  //Optimize the best route
  private OPTIMIZE_WAY_POINT: boolean;
  //Access Venue
  private IS_VENUE_ACCESSABLE: boolean;
  //List of places available in Mapwize Console
  private MAP_PLACES: Array<any>;

  constructor() {
    this.MAP_ZOOM = 20;
    this.VENUE_FLOOR = 2;
    this.IS_VENUE_ACCESSABLE = true;
    this.OPTIMIZE_WAY_POINT = true;
    this.MAP_PLACES = new Array<any>();
    mapwize.setApiKey(this.MAPWIZE_API_KEY);
    mapwize.Api.places.list({ venueId: this.MAPWIZE_VENUE }, (err, places) => {
      this.MAP_PLACES = places;
    });
  }

  public showMap(): Observable<boolean> {
    return Observable.create(observer => {
      this.mapInstance = mapwize.map(this.MAPWIZE_HOST, this.getMapwizeOptions(), (error, instance) => {
        if (error)
          return observer.error(false);
        this.mapInstance = instance;
        window['map'] = instance;
        observer.next(true);
        observer.complete();
      });
      //Focus on Venue
      this.mapInstance.centerOnVenue(this.MAPWIZE_VENUE);
    });
  }

  /**
   * @returns Map Options
   */
  private getMapwizeOptions(): Object {
    return {
      apiKey: this.MAPWIZE_API_KEY,
      showUserPosition: true,
      useBrowserLocation: true,
      zoom: this.MAP_ZOOM,
      floor: this.VENUE_FLOOR,
      displayLayers: true,
      displayPlaces: true,
      displayVenues: true,
    }
  }

  /**
   * @description zoom into map view
   */
  public zoomIn(): void {
    this.MAP_ZOOM++;
    this.mapInstance.setZoom(this.MAP_ZOOM);
  }

  /**
   * @description Zoom out the map view 
   */
  public zoomOut(): void {
    this.MAP_ZOOM--;
    this.mapInstance.setZoom(this.MAP_ZOOM);
  }

  /**
   * @description Set the current floor
   * @param floor 
   */
  public setFloor(floor: number): void {
    this.mapInstance.setFloor(floor);
  }

  /**
   *@description Retrives available places in venue
   *@returns Array<Places>
   */
  public getAvailableLocations(): Array<Object> {
    return this.MAP_PLACES;
  }

  /**
   * Initiate Navigation between two places in Venue
   * @param source Source Place Object
   * @param destination Destination Place Object
   */
  public getDirections(source, destination): Promise<Navigation> {
    return new Promise((resolve, reject) => {
      try {
        let from = this.getDirectionObject(source['_id'], this.MAPWIZE_VENUE);
        let to = this.getDirectionObject(destination['_id'], this.MAPWIZE_VENUE);
        mapwize.Api.getDirections(from, to, 0, this.getDirectionOption(), (error, direction) => {
          //Reject if error occured
          if (error)
            return reject(error);
          //Show Navigation and resolve
          this.mapInstance.startDirections(direction, this.getDirectionOption());
          return resolve({ source: source['name'], destination: destination['name'], time: direction['traveltime'] });
        });
      } catch (error) {
        //Reject if any Unhandled Exception Occured
        return reject(false);
      }
    });

  }

  /**
   * @description formats direction object 
   * @param placeId 
   * @param venueId 
   */
  private getDirectionObject(placeId, venueId): Object {
    return {
      placeId: placeId,
      venueId: venueId,
    }
  }

  //Set Venue Available to User
  public setVenueAccessable(isAccessable: boolean) {
    this.IS_VENUE_ACCESSABLE = isAccessable;
  }

  /**
   * @description Stop Showing Navigation
   * @returns If , direction is stopped
   */
  public stopNavigation(): boolean {
    if (null == this.mapInstance)
      return false;
    this.mapInstance.stopDirections();
    return true;
  }

  /**
   * @description Options for Direction
   */
  private getDirectionOption(): Object {
    return {
      isAccessible: this.IS_VENUE_ACCESSABLE,
      waypointOptimize: this.OPTIMIZE_WAY_POINT
    }
  }

}
