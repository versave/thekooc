import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'tk-button',
    standalone: true,
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, RouterModule],
})
export class ButtonComponent {
    @Input() public elementType: 'button' | 'link' = 'button';
    @Input() public buttonType: 'button' | 'submit' = 'button';
    @Input() public buttonStyle: 'primary' | 'secondary' | 'tertiary' = 'primary';
    @Input() public fullWidth = false;
    @Input() public href = '#';
    @Input() public label?: string;
    @Input() public loading = false;
    @Input() public disabled = false;
}
