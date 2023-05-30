import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RecipeCard } from '../../models/recipe.model';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'tk-recipe-card',
    standalone: true,
    imports: [CommonModule, NgOptimizedImage, RouterLink],
    templateUrl: './recipe-card.component.html',
    styleUrls: ['./recipe-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCardComponent {
    @Input() public cardData?: RecipeCard;
}
