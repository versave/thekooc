import { Injectable } from '@angular/core';
import { Breakpoint } from '../../models/media.model';

@Injectable({
    providedIn: 'root',
})
export class MediaService {
    // Breakpoints should be ordered from smallest to largest
    private breakpoints: Partial<Record<Breakpoint, number>> = {
        [Breakpoint.PhoneXs]: 400,
        [Breakpoint.Phone]: 650,
        [Breakpoint.Tablet]: 968,
        [Breakpoint.TabletLandscape]: 1024,
        [Breakpoint.Desktop]: 1440,
    };

    public getBreakpointSize(breakpointName: Breakpoint): number {
        return this.breakpoints[breakpointName] as number;
    }

    public getMatchingBreakpoint(): Breakpoint | null {
        const entries = Object.entries(this.breakpoints);

        for (const [key, value] of entries) {
            if (this.matchMedia(value)) {
                return key as Breakpoint;
            }
        }

        return null;
    }

    private matchMedia(breakpoint: number): boolean {
        return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
    }
}
