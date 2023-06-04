import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ImageComponent } from '../../../../components/image/image.component';

@Component({
    selector: 'tk-intro',
    standalone: true,
    imports: [CommonModule, ImageComponent, NgOptimizedImage],
    templateUrl: './intro.component.html',
    styleUrls: ['./intro.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroComponent {}
