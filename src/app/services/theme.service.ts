import {Inject, Injectable, PLATFORM_ID} from "@angular/core";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private readonly isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) platformId: Object) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    public isThemingSupported(): boolean {
        return this.isBrowser;
    }

    public setTheme(theme: string): void {
        localStorage.setItem("theme", theme);

        // @ts-ignore
        return document.getRootNode().children[0].className = theme;
    }

    public getTheme(): string {
        // @ts-ignore
        return document.getRootNode().children[0].className ?? "default";
    }
}