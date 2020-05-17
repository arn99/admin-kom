import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  constructor() { }

  public lat = 24.799448;
  public lng = 120.979021;
  public origin: any;
  public destination: any;

  ngOnInit() {
    this.getDirection();
  }

  markerDragEnd(origin, event) {
    console.log(origin);
    console.log(event);
  }
  getDirection() {
    this.destination = { lat: 14.713359, lng: -17.4455387 };
    this.origin = { lat: 14.713434,  lng: -17.444956 };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
          if (position) {
              console.log(position);
          }
      });
    }
    // this.origin = 'Taipei Main Station';
    // this.destination = 'Taiwan Presidential Office';
  }
  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
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
