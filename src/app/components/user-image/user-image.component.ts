import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ImageComponent } from '../image/image.component';

@Component({
    selector: 'tk-user-image',
    standalone: true,
    imports: [CommonModule, NgOptimizedImage, ImageComponent],
    templateUrl: './user-image.component.html',
    styleUrls: ['./user-image.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserImageComponent implements OnChanges {
    @Input() public size = '60';
    @Input() public imageUrl: string | undefined;

    public imageSize = '60';
    public placeholderSize = '30';

    public ngOnChanges(changes: SimpleChanges): void {
        if ('size' in changes) {
            this.imageSize = this.size;
            this.placeholderSize = `${Number(this.size) / 2}`;
        }
    }
}
