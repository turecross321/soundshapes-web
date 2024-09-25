import {Type} from "@angular/core";

export interface Popup {
  component: Type<any>;
  extraArguments: { [key: string]: any };
}
