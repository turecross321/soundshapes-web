import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  showPopup: boolean = false;

  constructor() {
  }

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }
}
