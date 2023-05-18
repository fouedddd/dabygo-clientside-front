import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.locatecontrol';
import 'leaflet-routing-machine';
import { DAB } from 'src/app/model/Dab.model';
import { ServiceDABService } from 'src/app/services/service-dab.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  dab: DAB[] = []; //tableau de dabs
  constructor(private dabservice: ServiceDABService) {

  }
  afficherDAB() {
    this.dabservice.listeDAB().subscribe(db => {
      //console.log(db);
      this.dab = db;
      navigator.geolocation.getCurrentPosition(this.successCallback, this.errorCallback);
    });

  }

  private icon: any = L.icon({
    iconUrl: "../../assets/ico/dab.png",
    iconSize: [40, 30]
  });

  private map: L.Map;
  addPath = (myPos: any, destination: any) => {

    L.Routing.control({
      waypoints: [
        L.latLng(myPos),
        L.latLng(destination)
      ],

      lineOptions: {
        extendToWaypoints: false,
        missingRouteTolerance: null,
        addWaypoints: true,
        missingRouteStyles: null,
        styles: [
          {
            color: 'blue',
            weight: 15,
            opacity: 0.7
          }
        ]
      },
      routeWhileDragging: false,
      addWaypoints: true,
      fitSelectedRoutes: true,
      showAlternatives: false,

    }).addTo(this.map);
  }
  private initMap(lat: number, lag: number): void {
    const centroid: any = [lat, lag]
    L.Marker.prototype.options.icon = this.icon;
    this.map = L.map('map', {
      center: centroid,
      zoom: 8,
    });

    L.control.locate({
      position: "topleft",
      showPopup: true,
      flyTo: true,
      icon: 'leaflet-control-locate-location-arrow',
      iconLoading: 'leaflet-control-locate-spinner',
      strings: {
        title: "Show me where I amm, yo!"
      }
    })
      .addTo(this.map);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    let previousMarker: { marker: L.Marker, path: L.Polyline } = { marker: null, path: null }
    for (let i = 0; i < this.dab.length; i++) {
      const pos = [Number(this.dab[i].latitude), Number(this.dab[i].longitude)]
      const x = L.marker(pos as L.LatLngExpression)
      x
        .addTo(this.map)
        .bindPopup(`

        <div style="display: flex; flex-direction: column; justify-content: space-between; align-items: center; padding: 16px; background-color: #ffffff; border: 1px solid #dcdcdc; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); border-radius: 8px; margin-bottom: 16px;">
        <div ">
        <div style="position: relative; width: 180px; height: 100px; margin-bottom: 10px;">
        <img width="200" height="100" src=${this.dab[i].image}>

      </div>
      
          <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 16px;">
          <div style="display: flex; flex-direction: column; justify-content: center;">
            <h2 style="font-size: 24px; color: #333333; font-weight: bold; margin: 0;">${this.dab[i].banque}</h2>
          
          </div>
        </div>
          <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 8px;">
          <div style="width: 32px; height: 32px; background-color: ${this.dab[i].etat === '1' ? '#228B22' : '#DC143C'}; color: white; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin-right: 8px;">
            <i class="fas fa-circle" style="font-size: 16px;"></i>
          </div>
          <h6 style="font-size: 16px; color: #333333; font-weight: bold; margin: 0;">Etat:</h6>
          <p style="font-size: 16px; color: #666666; margin: 0 0 0 8px; font-weight: bold;">${this.dab[i].etat === '1' ? 'En Service' : 'Hors service'}</p>
        </div>
        


          <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 8px;">
          <div style="width: 32px; height: 32px; background-color: #5F9EA0; color: white; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin-right: 8px;">
            <i class="fas fa-wallet" style="font-size: 20px;"></i>
          </div>
          <h6 style="font-size: 16px; color: #333333; font-weight: bold; margin: 0;">Plafond maximum:</h6>
          <p style="font-size: 16px; color: #666666; margin: 0 0 0 8px;">${this.dab[i].plafon_max} DT</p>
        </div>
      </div>
        `).addEventListener('click', () => {
          this.addPath(centroid, pos)
        })

    }


    tiles.addTo(this.map);

  }



  ngOnInit(): void {
    this.afficherDAB()
  }


  successCallback = (position: any) => {
    const lat = position.coords.latitude
    const lag = position.coords.longitude
    console.log(lat + " " + lag); // latitude - longitude
    this.initMap(lat, lag);
  };

  errorCallback = (error: any) => {
    console.log(error);
  };

}
