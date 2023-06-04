import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'tk-recipes',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesComponent {}
