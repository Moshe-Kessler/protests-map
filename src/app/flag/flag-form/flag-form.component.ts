import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import type { Flag } from '../flag';
import { FlagService } from '../flag.service';
import { FormErrorStateMatcher } from 'src/app/layout/form-error-state-matcher';
import type { Observable } from 'rxjs';
import flagColors from './flag-colors';
import mapOptions from './mapOptions';

@Component({
  selector: 'app-flag-form',
  templateUrl: './flag-form.component.html',
  styleUrls: ['./flag-form.component.scss'],
})
export class FlagFormComponent implements OnInit {
  loading$?: Observable<boolean>;
  error$?: Observable<string | undefined>;
  action$?: Observable<string | undefined>;
  flags$?: Observable<Flag[]>;
  matcher = new FormErrorStateMatcher();

  flags?: Flag[];
  flagForm = new FormGroup({
    uid: new FormControl(this.flagService.getUid()),
    createdAt: new FormControl(Date.now()),
    lastModified: new FormControl(Date.now()),
    url: new FormControl('', Validators.required),
  });
  location = new FormGroup({
    lat: new FormControl(
      navigator.geolocation.getCurrentPosition(
        (position) => position.coords.latitude
      )
    ),
    lng: new FormControl(
      navigator.geolocation.getCurrentPosition(
        (postion) => postion.coords.longitude
      )
    ),
  });
  mapOptions = mapOptions;
  flagColors = flagColors;
  center = {
    lat: 52.5163,
    lng: 13.3777,
  };
  mapCenter = {
    lat: 52.509831294,
    lng: 13.375165166,
  };
  imagePath =
    'https://raw.githubusercontent.com/googlemaps/v3-utility-library/master/markerclustererplus/images/m';

  constructor(private flagService: FlagService) {}

  addFlag(center: google.maps.LatLngLiteral) {
    this.flags = [
      {
        location: {
          lat: center.lat,
          lng: center.lng,
        },
        options: {
          icon: {
            url: this.flagForm.value.url,
          },
          animation: 1,
        },
      },
    ];
  }
  async submit() {
    let flag: Flag = {
      createdAt: this.flagForm.controls['createdAt'].value,
      lastModified: this.flagForm.controls['lastModified'].value,
      uid: this.flagForm.controls['uid'].value,
      options: {
        icon: {
          url: this.flagForm.controls['url'].value,
        },
        animation: 2,
      },
      location: this.location.value,
    };
    await this.flagService.create(flag);
  }
  mapClick(event: google.maps.MapMouseEvent) {
    this.center = event.latLng!.toJSON();
    this.location.controls['lat'].setValue(this.center?.lat);
    this.location.controls['lng'].setValue(this.center?.lng);
    this.addFlag(this.center);
  }
  ngOnInit(): void {
    this.loading$ = this.flagService.loading$;
    this.error$ = this.flagService.error$;
    this.action$ = this.flagService.action$;
    this.flags$ = this.flagService.flags$;
  }
}
