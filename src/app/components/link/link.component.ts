import {Component, Input, OnInit} from '@angular/core';
import {FaIconComponent, IconDefinition} from "@fortawesome/angular-fontawesome";
import {NavigationEnd, Router, RouterLink} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";
import {ColorType} from "../../types/components/color.type";

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [
    FaIconComponent,
    RouterLink,
    NgClass,
    NgIf
  ],
  templateUrl: './link.component.html',
})
export class LinkComponent implements OnInit {
  @Input() text: string = null!;
  @Input() icon: IconDefinition = null!;
  @Input() countSubUrls: boolean = true;
  @Input() highlightWhenOnPath: boolean = true;
  @Input() color: ColorType = ColorType.Content;
  currentlyOnPath: boolean = false;
  @Input() public urlPath: string = null!;
  @Input() localUrl: boolean = true;

  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setCurrentlyOnPath(event.url);
      }
    })
  }

  setCurrentlyOnPath(url: string) {
    if (!url) {
      return;
    }

    if (this.highlightWhenOnPath) {
      if (this.countSubUrls) {
        this.currentlyOnPath = url.startsWith(this.urlPath);
      } else {
        this.currentlyOnPath = url == this.urlPath;
      }
    }
  }

  ngOnInit(): void {
    this.setCurrentlyOnPath(this.router.url);
  }
}
