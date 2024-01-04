import { Component } from '@angular/core';
import { faComputer } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'xp-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent{
  faComputer = faComputer;
  image: string = "https://thumbs.dreamstime.com/b/generic-person-gray-photo-placeholder-man-silhouette-white-background-144511705.jpg";
  developers: any = [
    { name: "Anja Dučić", job: "Full stack developer", image: this.image, socials: "https://www.linkedin.com/"},
    { name: "Nina Kuzminac", job: "Full stack developer", image: this.image, socials: "https://www.linkedin.com/"},
    { name: "Marko Nikolić", job: "Full stack developer", image: this.image, socials: "https://www.linkedin.com/in/markonikolic01/"},
    { name: "Uroš Nikolovski", job: "Full stack developer", image: this.image, socials: "https://www.linkedin.com/in/uros-nikolovski/"},
    { name: "Veljko Nikolić", job: "Full stack developer", image: this.image, socials: "https://www.linkedin.com/in/veljko-nikolic/"},
    { name: "Dragoslav Maslać", job: "Full stack developer", image: this.image, socials: "https://www.linkedin.com/"},
    { name: "Miloš Milutinović", job: "Full stack developer", image: this.image, socials: "https://www.linkedin.com/in/milos-milutinovic-9aa5b8259/"},
    { name: "Vukašin Dokmanović", job: "Full stack developer", image: this.image, socials: "https://www.linkedin.com/"},
    { name: "Ivana Kovačević", job: "Full stack developer", image: this.image, socials: "https://www.linkedin.com/"},
    { name: "Jelena Kovač", job: "Full stack developer", image: this.image, socials: "https://www.linkedin.com/"},
    { name: "Marko Čekerinac", job: "Full stack developer", image: this.image, socials: "https://www.linkedin.com/"},
    { name: "Ivan Partalo", job: "Full stack developer", image: this.image, socials: "https://www.linkedin.com/"},
    { name: "Filip Simić", job: "Full stack developer", image: this.image, socials: "https://www.linkedin.com/"},
    { name: "Velimir Milinković", job: "Full stack developer", image: this.image, socials: "https://www.linkedin.com/"},
    { name: "Marko Krstić", job: "Full stack developer", image: this.image, socials: "https://www.linkedin.com/"},
    { name: "Boško Kulušic", job: "Full stack developer", image: this.image, socials: "https://www.linkedin.com/in/boskokulusic/"},
  ];

  openSocials(developer: any): void {
    window.open(developer.socials, '_blank');
  }

  showContact(): void {
    const documentHeight = document.body.scrollHeight;
    window.scrollTo({
      top: documentHeight,
      behavior: 'smooth'
    });
  }
}
