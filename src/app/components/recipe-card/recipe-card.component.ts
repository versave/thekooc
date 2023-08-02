import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImageComponent } from '../image/image.component';
import { CategoryTag, RecipeObject } from '../../models/recipe.model';
import { TransformService } from '../../services/transform/transform.service';
import { HoursAndMinutes } from '../../models/utils.model';

@Component({
    selector: 'tk-recipe-card',
    standalone: true,
    imports: [CommonModule, NgOptimizedImage, RouterLink, ImageComponent],
    templateUrl: './recipe-card.component.html',
    styleUrls: ['./recipe-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCardComponent {
    @Input() public cardData?: RecipeObject;

    constructor(private transformService: TransformService) {}

    public transformCookingTime(milliseconds: number): HoursAndMinutes {
        return this.transformService.convertMillisecondsToHoursAndMinutes(milliseconds);
    }

    public transformTags(tags: CategoryTag[]): string[] {
        return tags.map((tag) => tag.name);
    }
}
