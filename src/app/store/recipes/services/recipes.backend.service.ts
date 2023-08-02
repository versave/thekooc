import { Injectable } from '@angular/core';
import { FirestoreActionsService } from '../../../services/firestore-actions/firestore-actions.service';
import { Collections } from '../../../models/collections.enum';
import { FilterRequest, WhereCondition } from '../../../models/filter.model';

@Injectable({
    providedIn: 'root',
})
export class RecipesBackendService {
    constructor(private firestoreActions: FirestoreActionsService) {}

    public getRecipes<T>(filterRequest?: FilterRequest) {
        return this.firestoreActions.queryCollectionDocs<T>(Collections.recipes, filterRequest);
    }
}
