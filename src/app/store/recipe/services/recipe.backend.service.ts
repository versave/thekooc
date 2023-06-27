import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreActionsService } from '../../../services/firestore-actions/firestore-actions.service';
import { Collections } from '../../../models/collections.enum';
import { NewRecipeRequest } from '../../../models/recipe.model';
import { DocumentReference } from '@firebase/firestore';

@Injectable({
    providedIn: 'root',
})
export class RecipeBackendService {
    constructor(private firestoreActions: FirestoreActionsService) {}

    public addRecipe(recipe: NewRecipeRequest): Observable<DocumentReference> {
        return this.firestoreActions.addDoc<NewRecipeRequest>(Collections.recipes, recipe);
    }
}
