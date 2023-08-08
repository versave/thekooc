import { PlatformService } from '../../../services/platform/platform.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getRecipes, getUserRecipes } from '../store/actions';
import { Observable } from 'rxjs';
import { RecipeObject } from '../../../models/recipe.model';
import { selectGetRecipesData, selectGetRecipesLoading } from '../store/selectors';
import { FilterValues, WhereCondition } from '../../../models/filter.model';
import { staticCategories, staticTags } from '../../../static-data/static-data';
import { TransformService } from '../../../services/transform/transform.service';

@Injectable({
    providedIn: 'root',
})
export class RecipesFacade {
    public getRecipesData$: Observable<RecipeObject[] | null> = this.store.select(selectGetRecipesData);
    public getRecipesLoading$: Observable<boolean> = this.store.select(selectGetRecipesLoading);

    constructor(
        private store: Store,
        private platformService: PlatformService,
        private transformService: TransformService
    ) {}

    public getRecipes(selectedFilters?: FilterValues, isOrQuery?: boolean): void {
        let whereConditions: WhereCondition[] = [];

        if (selectedFilters) {
            whereConditions = this.makeWhereConditions(selectedFilters);
        }

        if (this.platformService.isBrowser()) {
            this.store.dispatch(getRecipes({ payload: { conditions: whereConditions, isOrQuery: !!isOrQuery } }));
        }
    }

    public getUserRecipes(userUid: string | null, selectedFilters?: FilterValues, isOrQuery?: boolean): void {
        let whereConditions: WhereCondition[] = [];

        if (selectedFilters) {
            whereConditions = this.makeWhereConditions(selectedFilters);
        }

        if (this.platformService.isBrowser()) {
            this.store.dispatch(
                getUserRecipes({
                    payload: {
                        userUid,
                        filters: { conditions: whereConditions, isOrQuery: !!isOrQuery },
                    },
                })
            );
        }
    }

    private makeWhereConditions(selectedFilters: FilterValues): WhereCondition[] {
        const whereConditions: WhereCondition[] = [];
        const categories = this.transformService.getMatchingCategoryTags(
            selectedFilters?.category || [],
            staticCategories
        );
        const tags = this.transformService.getMatchingCategoryTags(selectedFilters?.tag || [], staticTags);

        if (categories.length) {
            categories.forEach((category) => {
                whereConditions.push({
                    fieldPath: 'categories',
                    opStr: 'array-contains',
                    value: category,
                });
            });
        }

        if (tags.length) {
            tags.forEach((tag) => {
                whereConditions.push({
                    fieldPath: 'tags',
                    opStr: 'array-contains',
                    value: tag,
                });
            });
        }

        return whereConditions;
    }
}
