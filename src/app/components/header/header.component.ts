import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthFacade } from '../../store/auth/services/auth.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserModel } from '../../models/user.model';

@UntilDestroy()
@Component({
    selector: 'tk-header',
    standalone: true,
    imports: [CommonModule, RouterLink, NgOptimizedImage],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
    public userData$ = this.authFacade.userData$;

    public userData: UserModel | null = null;

    constructor(private authFacade: AuthFacade, private cdr: ChangeDetectorRef) {}

    public ngOnInit(): void {
        this.userData$.pipe(untilDestroyed(this)).subscribe((userData) => {
            this.userData = userData;
            this.cdr.detectChanges();
        });
    }

    public signInUser(): void {
        this.authFacade.signInUser();
    }
}
