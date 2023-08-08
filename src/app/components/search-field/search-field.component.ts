import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'tk-search-field',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './search-field.component.html',
    styleUrls: ['./search-field.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFieldComponent {}
