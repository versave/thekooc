import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { userMock } from '../../mocks/user.mock';
import { ImageComponent } from '../../components/Image/image.component';

@Component({
    selector: 'tk-account',
    standalone: true,
    imports: [CommonModule, ImageComponent, NgOptimizedImage],
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {
    public user = userMock;
}
