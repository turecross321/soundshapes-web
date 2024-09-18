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
  @Input() path: string = null!;
  @Input() icon: IconDefinition = null!;
  @Input() countSubUrls: boolean = true;

  currentlyOnPath: boolean = false;

  constructor(router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.countSubUrls) {
          this.currentlyOnPath = event.url.startsWith(this.path);
        } else {
          this.currentlyOnPath = event.url == this.path;
        }
      }
    })
  }
}
