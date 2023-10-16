import {Component, Input} from '@angular/core';
import {ApiRoute} from "../../api/types/api-route";
import {ParameterType} from "../../api/types/api-parameter-type";
import {ApiParameter} from "../../api/types/api-parameter";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faKey, faUserShield} from '@fortawesome/free-solid-svg-icons';
import {PermissionsType} from "../../api/types/api-permissions-type";

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
        if (parameter.Type == ParameterType.Query)
            return "?" + parameter.Name;
        else if (parameter.Type == ParameterType.Route)
            return "{" + parameter.Name + "}";

        return parameter.Name;
    }

    minimumPermissionsString() {
        return PermissionsType[this.route.MinimumPermissionsType];
    }

    minimumPermissionsTooltip() {
        return "Requires " + PermissionsType[this.route.MinimumPermissionsType] + " permissions or higher";
    }
}
