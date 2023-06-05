import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'tk-pill',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './pill.component.html',
    styleUrls: ['./pill.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PillComponent {}
