import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ImageProperties, ImageData } from '../../models/image.model';
import { ImageService } from '../../services/image-service/image.service';

@Component({
    selector: 'tk-image',
    standalone: true,
    imports: [CommonModule, NgOptimizedImage],
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent {
    @Input({ required: true }) public imageProperties: ImageProperties = {} as ImageProperties;
    @Input() public width?: string;
    @Input() public height?: string;
    @Input({ required: true }) public alt = '';
    @Input() public priority = false;
    @Input() public fill = false;

    constructor(private imageService: ImageService) {}

    public makeImageData(): ImageData {
        return this.imageService.makeImageData(this.imageProperties);
    }
}
