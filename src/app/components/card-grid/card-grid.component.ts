import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeObject } from '../../models/recipe.model';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';

@Component({
    selector: 'tk-card-grid',
    standalone: true,
    imports: [CommonModule, RecipeCardComponent],
    templateUrl: './card-grid.component.html',
    styleUrls: ['./card-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardGridComponent {
    @Input() public cards: RecipeObject[] = [];

    public trackByFn(index: number, item: RecipeObject): string {
        return item.id;
    }
}
