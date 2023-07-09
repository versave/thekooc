import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreActionsService } from '../../../services/firestore-actions/firestore-actions.service';
import { Collections } from '../../../models/collections.enum';
import { RecipeData } from '../../../models/recipe.model';
import { DocumentReference } from '@firebase/firestore';
import { DocumentSnapshot } from '@angular/fire/firestore';
import { UserModel } from '../../../models/user.model';

@Injectable({
    providedIn: 'root',
})
export class RecipeBackendService {
    constructor(private firestoreActions: FirestoreActionsService) {}

    public getRecipe(recipeId: string): Observable<DocumentSnapshot<RecipeData>> {
        return this.firestoreActions.getDocByRef<RecipeData>(Collections.recipes, recipeId);
    }

    public addRecipe(recipe: RecipeData): Observable<DocumentReference> {
        return this.firestoreActions.addDoc<RecipeData>(Collections.recipes, recipe);
    }

    public updateRecipe(recipe: { recipeId: string; data: RecipeData }): Observable<void> {
        return this.firestoreActions.setDoc<RecipeData>(Collections.recipes, recipe.recipeId, recipe.data);
    }

    public saveUser(user: UserModel): Observable<void> {
        return this.firestoreActions.setDoc<UserModel>(Collections.users, user.uid, user);
    }
}
