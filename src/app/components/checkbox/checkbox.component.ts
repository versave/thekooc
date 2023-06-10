import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomFormControl } from '../../directives/custom-form-control.directive';

@Component({
    selector: 'tk-checkbox',
    standalone: true,
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ReactiveFormsModule, CommonModule],
})
export class CheckboxComponent extends CustomFormControl {
    @Input() public label?: string;
    @Input() public loading = false;
    @Input() public disabled = false;
    @Output() public checkboxChange = new EventEmitter<boolean>();

    public checkboxValid(): boolean {
        return !(this.customControl?.invalid && (this.customControl?.touched || !this.customControl?.pristine));
    }
}
