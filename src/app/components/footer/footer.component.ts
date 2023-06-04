import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'tk-footer',
    standalone: true,
    imports: [CommonModule, NgOptimizedImage, RouterLink],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
    public copyText = `© ${new Date().getFullYear()} thekooc`;
}
