import { Component } from '@angular/core';

@Component({
  selector: 'xp-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent {
  showContact(): void {
    const documentHeight = document.body.scrollHeight;
    window.scrollTo({
      top: documentHeight,
      behavior: 'smooth'
    });
}
}
