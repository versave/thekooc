import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeCard } from '../../models/recipe.model';
import { RecipeCardComponent } from '../RecipeCard/recipe-card.component';

@Component({
    selector: 'tk-card-grid',
    standalone: true,
    imports: [CommonModule, RecipeCardComponent],
    templateUrl: './card-grid.component.html',
    styleUrls: ['./card-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardGridComponent {
    @Input() public cards: RecipeCard[] = [];

    public trackByFn(index: number, item: RecipeCard): string {
        return item.id;
    }
}
