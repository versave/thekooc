import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'tk-card-grid',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './card-grid.component.html',
    styleUrls: ['./card-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardGridComponent {}
