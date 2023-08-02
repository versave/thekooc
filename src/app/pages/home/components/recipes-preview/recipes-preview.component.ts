import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardGridComponent } from '../../../../components/card-grid/card-grid.component';

@Component({
    selector: 'tk-recipes-preview',
    standalone: true,
    imports: [CommonModule, CardGridComponent],
    templateUrl: './recipes-preview.component.html',
    styleUrls: ['./recipes-preview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesPreviewComponent {
    // todo: Remove mocks and use firestore data
    // public cardMocks = getRecipeMocks();
}
