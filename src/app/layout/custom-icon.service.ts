import { DomSanitizer } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
@Injectable({
  providedIn: 'root',
})
export class CustomIconService {
  dir = 'assets/icons';
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {}
  init() {
    this.matIconRegistry.addSvgIcon(
      'blue-flag',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `${this.dir}/blue-flag.svg`,
      ),
    );
    this.matIconRegistry.addSvgIcon(
      'dark-blue-flag',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `${this.dir}/dark-blue-flag.svg`,
      ),
    );
    this.matIconRegistry.addSvgIcon(
      'gray-flag',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `${this.dir}/gray-flag.svg`,
      ),
    );
    this.matIconRegistry.addSvgIcon(
      'green-flag',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `${this.dir}/green-flag.svg`,
      ),
    );
    this.matIconRegistry.addSvgIcon(
      'pink-flag',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `${this.dir}/pink-flag.svg`,
      ),
    );
    this.matIconRegistry.addSvgIcon(
      'red-flag',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `${this.dir}/red-flag.svg`,
      ),
    );
    this.matIconRegistry.addSvgIcon(
      'turquis-flag',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `${this.dir}/turquis-flag.svg`,
      ),
    );
    this.matIconRegistry.addSvgIcon(
      'yellow-flag',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `${this.dir}/yellow-flag.svg`,
      ),
    );
    this.matIconRegistry.addSvgIcon(
      'shield',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `${this.dir}/shield.svg`,
      ),
    );
    this.matIconRegistry.addSvgIcon(
      'anonymous',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `${this.dir}/anonymous.svg`,
      ),
    );
    this.matIconRegistry.addSvgIcon(
      'liberty',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `${this.dir}/liberty.svg`,
      ),
    );
    this.matIconRegistry.addSvgIcon(
      'google',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg',
      ),
    );
  }
}
