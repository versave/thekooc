import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../components/button/button.component';
import { AuthFacade } from '../../../../store/auth/services/auth.facade';
import { Observable } from 'rxjs';
import { UserModel } from '../../../../models/user.model';

@Component({
    selector: 'tk-callout',
    standalone: true,
    imports: [CommonModule, ButtonComponent],
    templateUrl: './callout.component.html',
    styleUrls: ['./callout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalloutComponent {
    public singInUserData$: Observable<UserModel | null> = this.authFacade.userData$;

    constructor(private authFacade: AuthFacade) {}

    public signInUser(): void {
        this.authFacade.signInUser();
    }
}
