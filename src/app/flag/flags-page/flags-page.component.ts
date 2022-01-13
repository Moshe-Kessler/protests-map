import { Component, OnInit } from '@angular/core';

import { Flag } from '../flag';
import { FlagService } from '../flag.service';
import { Observable } from 'rxjs';
import mapOptions from '../flag-form/mapOptions';

@Component({
  selector: 'app-flags-page',
  templateUrl: './flags-page.component.html',
  styleUrls: ['./flags-page.component.scss'],
})
export class FlagsPageComponent implements OnInit {
  loading$?: Observable<boolean>;
  flags$?: Observable<Flag[]>;
  totalFlags$?: Observable<number>;
  totalLiveFlags$?: Observable<number>;
  totalUserFlags$?: Observable<number>;
  totalUniqueUsers$?: Observable<number>;
  error$?: Observable<string | undefined>;
  action$?: Observable<string | undefined>;
  hasLiveFlag$?: Observable<boolean | undefined>;
  mapOptions = mapOptions;
  center = {
    lat: 52.5163,
    lng: 13.3777,
  };
  imagePath =
    'https://raw.githubusercontent.com/googlemaps/v3-utility-library/master/markerclustererplus/images/m';
  title!: string;
  constructor(private flagService: FlagService) {}

  ngOnInit(): void {
    this.loading$ = this.flagService.loading$;
    this.flags$ = this.flagService.flags$;
    this.error$ = this.flagService.error$;
    this.action$ = this.flagService.action$;
    this.hasLiveFlag$ = this.flagService.hasLiveFlag$;
    this.totalFlags$ = this.flagService.totalFlags$;
    this.totalLiveFlags$ = this.flagService.totalLiveFlags$;
    this.totalUserFlags$ = this.flagService.totalUserFlags$;
    this.totalUniqueUsers$ = this.flagService.totalUniqueUsers$;
    this.title = 'All Flags';
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  getMyFlags() {
    this.flags$ = this.flagService.myFlags$;
    this.title = 'My Flags';
  }

  getLiveFlags() {
    this.flags$ = this.flagService.liveFlags$;
    this.title = 'Live Flags';
  }
}
