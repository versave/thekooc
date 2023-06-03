import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CategoryCard } from '../../models/category.model';
import { RouterLink } from '@angular/router';
import { ImageComponent } from '../Image/image.component';

@Component({
    selector: 'tk-category-card',
    standalone: true,
    imports: [CommonModule, NgOptimizedImage, RouterLink, ImageComponent],
    templateUrl: './category-card.component.html',
    styleUrls: ['./category-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryCardComponent {
    @Input() public categoryData?: CategoryCard;
}
