import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'tk-recipe-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './recipe-card.component.html',
    styleUrls: ['./recipe-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCardComponent {}
