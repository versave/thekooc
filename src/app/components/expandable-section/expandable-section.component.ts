import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'tk-expandable-section',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './expandable-section.component.html',
    styleUrls: ['./expandable-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandableSectionComponent {
    @Input() public title: string;
    @Input() public expanded = true;
}
