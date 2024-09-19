import {Component, Input} from '@angular/core';
import {FaIconComponent, IconDefinition} from "@fortawesome/angular-fontawesome";
import {NavigationEnd, Router, RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-nav-link',
  standalone: true,
  imports: [
    FaIconComponent,
    RouterLink,
    NgClass
  ],
  templateUrl: './nav-link.component.html',
})
export class NavLinkComponent {
  @Input() label: string = null!;
  @Input() path: string | null = null;
  @Input() icon: IconDefinition = null!;
  @Input() countSubUrls: boolean = true;

  currentlyOnPath: boolean = false;

  constructor(router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setCurrentlyOnPath(event.url);
      }
    })
  }

  setCurrentlyOnPath(url: string) {
    if (this.path) {
      if (this.countSubUrls) {
        this.currentlyOnPath = url.startsWith(this.path);
      } else {
        this.currentlyOnPath = url == this.path;
      }
    }
  }
}
