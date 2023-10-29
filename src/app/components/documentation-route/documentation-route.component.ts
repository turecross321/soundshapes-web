import {Component, Input} from '@angular/core';
import {ApiRoute} from "../../api/types/api-route";
import {ParameterType} from "../../api/types/api-parameter-type";
import {ApiParameter} from "../../api/types/api-parameter";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {PermissionsType} from "../../api/types/api-permissions-type";
import {faKey, faUserShield} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-documentation-route',
    templateUrl: './documentation-route.component.html',
    styleUrls: []
})
export class DocumentationRouteComponent {
    @Input() route: ApiRoute = null!;
    faKey: IconDefinition = faKey;
    faUserShield: IconDefinition = faUserShield;
    protected readonly PermissionsType = PermissionsType;

    paramString(parameter: ApiParameter) {
        if (parameter.type == ParameterType.query)
            return "?" + parameter.name;
        else if (parameter.type == ParameterType.route)
            return "{" + parameter.name + "}";

        return parameter.name;
    }

    minimumPermissionsString() : string {
        return PermissionsType[this.route.minimumPermissionsType!];
    }

    minimumPermissionsTooltip() : string  {
        return "Requires " + PermissionsType[this.route.minimumPermissionsType!] + " permissions or higher.";
    }
}
