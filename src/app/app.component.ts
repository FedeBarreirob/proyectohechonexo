import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { OneSignalService } from './services/push/one-signal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'Gaviglio Digital Clientes';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private oneSignal: OneSignalService
  ) {
    this.matIconRegistry.addSvgIcon(
      "pdf",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/pdf.svg")
    );

    oneSignal.init();
  }
}
