import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from '../../components/image/image.component';
import { UserImageComponent } from '../../components/user-image/user-image.component';
import { AuthFacade } from '../../store/auth/services/auth.facade';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, combineLatest } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { ButtonComponent } from '../../components/button/button.component';
import { CardGridComponent } from '../../components/card-grid/card-grid.component';
import { FiltersComponent } from '../../components/filters/filters.component';
import { FilterType, FilterValues } from '../../models/filter.model';
import { RecipeObject } from '../../models/recipe.model';
import { RecipesFacade } from '../../store/recipes/services/recipes.facade';

@UntilDestroy()
@Component({
    selector: 'tk-account',
    standalone: true,
    imports: [CommonModule, ImageComponent, UserImageComponent, ButtonComponent, CardGridComponent, FiltersComponent],
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent implements OnInit {
    public singInUserData$: Observable<UserModel | null> = this.authFacade.userData$;
    public getUserData$: Observable<UserModel | null> = this.authFacade.getUserData$;
    public userData$: Observable<UserModel | null>;
    public recipesData$: Observable<RecipeObject[] | null> = this.recipesFacade.getRecipesData$;
    public recipesLoading$: Observable<boolean> = this.recipesFacade.getRecipesLoading$;

    public isOwner = false;
    public userUid: string | null = null;

    constructor(
        private authFacade: AuthFacade,
        private route: ActivatedRoute,
        private cdr: ChangeDetectorRef,
        private router: Router,
        private recipesFacade: RecipesFacade
    ) {}

    public ngOnInit(): void {
        this.getUser();

        this.route.queryParams
            .pipe(untilDestroyed(this))
            .subscribe((params) =>
                this.recipesFacade.getUserRecipes(this.userUid, this.makeFiltersFromQueryParams(params), true)
            );
    }

    public signOut(): void {
        this.authFacade.signOutUser();
    }

    public handleActivatedFilters(filters: FilterValues): void {
        void this.router.navigate([], {
            queryParams: filters,
            queryParamsHandling: 'merge',
        });
    }

    private getUser(): void {
        combineLatest([this.route.params, this.singInUserData$])
            .pipe(untilDestroyed(this))
            .subscribe(([{ uid }, singInUserData]) => {
                if (uid) {
                    this.userData$ = uid === singInUserData?.uid ? this.singInUserData$ : this.getUserData$;
                    this.isOwner = uid === singInUserData?.uid;
                    this.userUid = uid;
                } else {
                    this.userData$ = this.singInUserData$;
                    this.isOwner = true;
                }

                this.cdr.detectChanges();
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
