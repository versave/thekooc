import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../components/button/button.component';

@Component({
    selector: 'tk-callout',
    standalone: true,
    imports: [CommonModule, ButtonComponent],
    templateUrl: './callout.component.html',
    styleUrls: ['./callout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalloutComponent {}
