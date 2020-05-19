import { LocationData } from './../models/location-data';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MapsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LocationData) {
      console.log(data);
    }

  public lat = 24.799448;
  public lng = 120.979021;
  public origin: any;
  public destination: any;
  public markerOptions = {
    origin: {
      infoWindow: 'Moi.',
      label: 'Moi',
    },
    waypoints: [
    ],
    destination: {
      infoWindow: 'Client',
      label: 'Client',
    },
  };
  public renderOptions = {
    suppressMarkers: false,
  };
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.getDirection();
  }

  markerDragEnd(origin, event) {
    console.log(origin);
    console.log(event);
  }
  getDirection() {
    this.destination = { lat: this.data.latitude, lng: this.data.longitude };
    this.origin = { lat: 14.711955,  lng: -17.476596 };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
          if (position) {
          }
      });
    }
    // this.origin = 'Taipei Main Station';
    // this.destination = 'Taiwan Presidential Office';
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.watchPosition();
  }
  async watchPosition() {
    const that = this;
    const options = {
      maximumAge: 3600000,
      timeout: 3000,
      enableHighAccuracy: true,
    };
    const watchID = await navigator.geolocation.watchPosition((po) => this.onSuccess(po));
    function onError(error) {
      alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }
  }
  onSuccess(position) {
    console.log(position);
    this.origin =  { lat: position.coords.latitude, lng: position.coords.longitude };
  }

}
