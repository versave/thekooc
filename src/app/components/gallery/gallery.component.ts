import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ImageComponent } from '../image/image.component';
import { ImageProperties } from '../../models/image.model';

@Component({
    selector: 'tk-gallery',
    standalone: true,
    imports: [CommonModule, ImageComponent, NgOptimizedImage],
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent {
    @Input() public images: ImageProperties[] = [];

    public trackByFn(index: number, item: ImageProperties): string {
        return index.toString();
    }
}
