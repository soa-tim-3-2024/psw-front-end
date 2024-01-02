import { Component } from '@angular/core';

@Component({
  selector: 'xp-terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.css']
})
export class TermsOfServiceComponent {
  showContact(): void {
    const documentHeight = document.body.scrollHeight;
    window.scrollTo({
      top: documentHeight,
      behavior: 'smooth'
    });
}
}
