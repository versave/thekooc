import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { userMock } from '../../mocks/user.mock';
import { ImageComponent } from '../../components/image/image.component';
import { UserImageComponent } from '../../components/user-image/user-image.component';
import { AuthFacade } from '../../store/auth/services/auth.facade';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
    selector: 'tk-account',
    standalone: true,
    imports: [CommonModule, ImageComponent, UserImageComponent],
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent implements OnInit {
    public user = userMock;

    constructor(private authFacade: AuthFacade, private route: ActivatedRoute) {}

    public ngOnInit(): void {
        this.getUser();
    }

    public signOut(): void {
        this.authFacade.signOutUser();
    }

    private getUser(): void {
        this.route.params.pipe(untilDestroyed(this)).subscribe(({ uid }) => {
            console.log('params', uid);
        });
    }
}
