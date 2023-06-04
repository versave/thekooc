import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivationEnd, Router, RouterModule } from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ShellComponent } from './components/shell/shell.component';
import { NgIf, NgTemplateOutlet } from '@angular/common';

@UntilDestroy()
@Component({
    standalone: true,
    imports: [RouterModule, ShellComponent, NgIf, NgTemplateOutlet],
    selector: 'tk-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
    public useShell = true;

    constructor(private router: Router) {}

    public ngOnInit(): void {
        this.handleRouteData();
    }

    private handleRouteData(): void {
        this.router.events
            .pipe(
                filter((event: any) => event instanceof ActivationEnd),
                map((event: ActivationEnd) => event?.snapshot?.data),
                distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
                untilDestroyed(this)
            )
            .subscribe((routeData) => {
                this.useShell = (routeData?.['useShell'] as boolean) ?? true;
            });
    }
}
