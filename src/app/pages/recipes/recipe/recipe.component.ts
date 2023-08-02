import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { GalleryComponent } from '../../../components/gallery/gallery.component';
import { PillComponent } from '../../../components/pill/pill.component';
import { ImageComponent } from '../../../components/image/image.component';
import { UserImageComponent } from '../../../components/user-image/user-image.component';
import { SingleRecipeFacade } from '../../../store/single-recipe/services/single-recipe.facade';
import { TransformService } from '../../../services/transform/transform.service';
import { HoursAndMinutes } from '../../../models/utils.model';
import { ImageProperties } from '../../../models/image.model';
import { AuthFacade } from '../../../store/auth/services/auth.facade';
import { ButtonComponent } from '../../../components/button/button.component';
import { UserModel } from '../../../models/user.model';

@UntilDestroy()
@Component({
    selector: 'tk-recipe',
    standalone: true,
    imports: [
        CommonModule,
        NgOptimizedImage,
        GalleryComponent,
        RouterLink,
        PillComponent,
        ImageComponent,
        UserImageComponent,
        ButtonComponent,
    ],
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeComponent implements OnInit {
    public recipeData$ = this.recipeFacade.getRecipeData$;
    public deleteRecipeLoading$ = this.recipeFacade.deleteRecipeLoading$;
    public userData$ = this.authFacade.userData$;

    public user: UserModel | null = null;

    constructor(
        private route: ActivatedRoute,
        private recipeFacade: SingleRecipeFacade,
        private transformService: TransformService,
        private authFacade: AuthFacade
    ) {}

    public ngOnInit(): void {
        this.route.params.pipe(untilDestroyed(this)).subscribe(({ id }) => this.recipeFacade.getRecipe(id));
        this.getUser();
    }

    public trackIngredients(index: number, item: string): string {
        return `${index}-${item}`;
    }

    public transformCookingTime(milliseconds: number): HoursAndMinutes {
        return this.transformService.convertMillisecondsToHoursAndMinutes(milliseconds);
    }

    public transformImages(images: string[]): ImageProperties[] {
        return images.map((image) => ({ path: image, hasRetina: false, alt: 'Recipe image' }));
    }

    public deleteRecipe(id: string): void {
        this.recipeFacade.deleteRecipe(id);
    }

    private getUser(): void {
        this.userData$.pipe(untilDestroyed(this)).subscribe((user) => (this.user = user));
    }
}
