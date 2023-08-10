import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardGridComponent } from '../../../../components/card-grid/card-grid.component';
import { RecipesFacade } from '../../../../store/recipes/services/recipes.facade';
import { Observable } from 'rxjs';
import { RecipeObject } from '../../../../models/recipe.model';

@Component({
    selector: 'tk-recipes-preview',
    standalone: true,
    imports: [CommonModule, CardGridComponent],
    templateUrl: './recipes-preview.component.html',
    styleUrls: ['./recipes-preview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesPreviewComponent implements OnInit {
    public recipesData$: Observable<RecipeObject[] | null> = this.recipesFacade.getRecipesData$;

    constructor(private recipesFacade: RecipesFacade) {}

    public ngOnInit(): void {
        this.recipesFacade.getLatestRecipes();
    }
}
