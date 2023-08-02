import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { RecipesFacade } from '../../store/recipes/services/recipes.facade';
import { Observable } from 'rxjs';
import { RecipeObject } from '../../models/recipe.model';
import { CardGridComponent } from '../../components/card-grid/card-grid.component';
import { FiltersComponent } from '../../components/filters/filters.component';
import { FilterType, FilterValues } from '../../models/filter.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
    selector: 'tk-recipes',
    standalone: true,
    imports: [CommonModule, RouterLink, CardGridComponent, FiltersComponent],
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesComponent implements OnInit {
    public recipesData$: Observable<RecipeObject[] | null> = this.recipesFacade.getRecipesData$;
    public recipesLoading$: Observable<boolean> = this.recipesFacade.getRecipesLoading$;

    constructor(private recipesFacade: RecipesFacade, private router: Router, private route: ActivatedRoute) {}

    public ngOnInit(): void {
        this.route.queryParams
            .pipe(untilDestroyed(this))
            .subscribe((params) => this.recipesFacade.getRecipes(this.makeFiltersFromQueryParams(params), true));
    }

    public handleActivatedFilters(filters: FilterValues): void {
        void this.router.navigate([], {
            queryParams: filters,
            queryParamsHandling: 'merge',
        });
    }

    private makeFiltersFromQueryParams(params: Params): FilterValues {
        const filters: FilterValues = {
            [FilterType.category]: [],
            [FilterType.tag]: [],
        };
        const filterValues = Object.values(FilterType);

        filterValues.forEach((filterType) => {
            const filterItems = params[filterType];

            if (filterItems) {
                filters[filterType] = Array.isArray(filterItems) ? filterItems : [filterItems];
            }
        });

        return filters;
    }
}
