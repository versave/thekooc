import { TestBed } from '@angular/core/testing';

import { FirestoreActionsService } from './firestore-actions.service';

describe('FirestoreActionsService', () => {
    let service: FirestoreActionsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FirestoreActionsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
