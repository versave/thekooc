import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { userMock } from '../../mocks/user.mock';
import { ImageComponent } from '../../components/image/image.component';
import { UserImageComponent } from '../../components/user-image/user-image.component';
import { AuthFacade } from '../../store/auth/services/auth.facade';

@Component({
    selector: 'tk-account',
    standalone: true,
    imports: [CommonModule, ImageComponent, UserImageComponent],
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {
    public user = userMock;

    constructor(private authFacade: AuthFacade) {}

    public signOut(): void {
        this.authFacade.signOutUser();
    }
}
