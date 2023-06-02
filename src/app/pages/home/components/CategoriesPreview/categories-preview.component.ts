import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { categoryCards } from '../../../../mocks/category.mock';
import { CategoryCardComponent } from '../../../../components/CategoryCard/category-card.component';
import { CategoryCard } from '../../../../models/category.model';

@Component({
    selector: 'tk-categories-preview',
    standalone: true,
    imports: [CommonModule, CategoryCardComponent],
    templateUrl: './categories-preview.component.html',
    styleUrls: ['./categories-preview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesPreviewComponent {
    // todo: Remove mocks and use firestore data
    public categoryMocks = categoryCards;

    public trackCategoryByFn(index: number, item: CategoryCard): string {
        return item.id;
    }
}
