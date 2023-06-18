import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthFacade } from '../../store/auth/services/auth.facade';

@Component({
    selector: 'tk-header',
    standalone: true,
    imports: [CommonModule, RouterLink, NgOptimizedImage],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    constructor(private authFacade: AuthFacade) {}

    public signInUser(): void {
        this.authFacade.signInUser();
    }
}
