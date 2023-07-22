import { Injectable } from '@angular/core';
import { HoursAndMinutes } from '../../models/utils.model';

@Injectable({
    providedIn: 'root',
})
export class TransformService {
    public convertHoursAndMinutesToMilliseconds(hours: number, minutes: number): number {
        return (hours * 60 + minutes) * 60 * 1000;
    }

    public convertMillisecondsToHoursAndMinutes(milliseconds: number): HoursAndMinutes {
        const hours = Math.floor(milliseconds / 1000 / 60 / 60);
        const minutes = Math.floor((milliseconds / 1000 / 60 / 60 - hours) * 60);

        return { hours, minutes };
    }
}
