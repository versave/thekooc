import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCardComponent } from '../../../../components/category-card/category-card.component';
import { CategoryCard } from '../../../../models/category.model';
import { staticCategories } from '../../../../static-data/static-data';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'tk-categories-preview',
    standalone: true,
    imports: [CommonModule, CategoryCardComponent, RouterLink],
    templateUrl: './categories-preview.component.html',
    styleUrls: ['./categories-preview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesPreviewComponent {
    public staticCategories = staticCategories;

    public trackCategoryByFn(index: number, item: CategoryCard): string {
        return index + item.title;
    }

    public getCategories(): CategoryCard[] {
        return this.staticCategories.map((category) => ({
            key: category.key,
            title: category.name,
            imageUrl: `/assets/icons/${category.key}.svg`,
        }));
    }
}
