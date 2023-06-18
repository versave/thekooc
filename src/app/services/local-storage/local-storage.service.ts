import { Injectable } from '@angular/core';
import { LocalStorageKey } from '../../models/local-storage.model';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    public setItemOfType<T>(key: LocalStorageKey, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public getItemOfType<T>(key: LocalStorageKey): T | null {
        const item = localStorage.getItem(key);

        if (item) {
            return JSON.parse(item);
        }

        return null;
    }

    public removeItem(key: LocalStorageKey): void {
        localStorage.removeItem(key);
    }
}
