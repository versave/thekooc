import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'tk-recipes',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesComponent {}
