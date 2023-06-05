import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FullRecipe, Ingredient } from '../../../models/recipe.model';
import { recipePageDataMock } from '../../../mocks/recipe.mock';
import { GalleryComponent } from '../../../components/gallery/gallery.component';
import { PillComponent } from '../../../components/pill/pill.component';
import { userMock } from '../../../mocks/user.mock';
import { ImageComponent } from '../../../components/image/image.component';
import { UserImageComponent } from '../../../components/user-image/user-image.component';

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
    ],
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeComponent implements OnInit {
    public recipeData: FullRecipe = recipePageDataMock;

    constructor(private route: ActivatedRoute) {}

    public ngOnInit(): void {
        this.route.params.pipe(untilDestroyed(this)).subscribe(({ slug }) => {
            console.log('slug', slug);
        });
    }

    public trackIngredients(index: number, item: Ingredient): string {
        return `${index}-${item.name}`;
    }

    protected readonly userMock = userMock;
}
