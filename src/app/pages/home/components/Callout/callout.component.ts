import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'tk-callout',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './callout.component.html',
    styleUrls: ['./callout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalloutComponent {}
