import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouteData } from '../../models/route-data.model';

@Injectable({
    providedIn: 'root',
})
export class MetaHandlerService {
    private titlePostfix = ' | The Kooc';

    constructor(private metaService: Meta, private titleService: Title) {}

    public setPageMeta(routeData: RouteData): void {
        if (routeData?.routeTitle) {
            const postfixedTitle = routeData.routeTitle + this.titlePostfix;

            this.titleService.setTitle(postfixedTitle);
            this.metaService.updateTag({ name: 'title', content: postfixedTitle });
        }

        if (routeData?.routeDescription) {
            this.metaService.updateTag({ name: 'description', content: routeData.routeDescription });
        }
    }
}
