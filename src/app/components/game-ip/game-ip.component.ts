import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ApiGameIp} from "../../api/types/api-game-ip";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faCheckCircle, faStopwatch, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-game-ip',
  templateUrl: './game-ip.component.html',
  styleUrls: []
})
export class GameIpComponent {
  @Input() ip: ApiGameIp = null!;
  @Output() onRemove: EventEmitter<null> = new EventEmitter<null>();
  @Output() onAuthorize: EventEmitter<boolean> = new EventEmitter<boolean>();
  faCheckCircle: IconDefinition = faCheckCircle;
  faStopwatch: IconDefinition = faStopwatch;
  faTrashAlt: IconDefinition = faTrashAlt;

  remove() {
    this.onRemove.emit();
  }

  authorize(oneTime: boolean) {
    this.onAuthorize.emit(oneTime);
  }
}
