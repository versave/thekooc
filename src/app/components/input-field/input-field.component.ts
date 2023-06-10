import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomFormControl } from '../../directives/custom-form-control.directive';

@Component({
    selector: 'tk-input-field',
    standalone: true,
    templateUrl: './input-field.component.html',
    styleUrls: ['./input-field.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ReactiveFormsModule, CommonModule],
})
export class InputFieldComponent extends CustomFormControl implements OnInit {
    @Input() public label?: string;
    @Input() public type: 'text' | 'email' = 'text';
    @Input() public textarea = false;
    @Input() public placeholder = '';
    @Input() public errorWarning?: string;
    @Output() public inputChange = new EventEmitter<string>();

    public isRequired = false;
    public placeholderValue = this.placeholder;

    public ngOnInit(): void {
        this.isRequired = !!this.customControl?.hasValidator(Validators.required);
        this.placeholderValue = this.isRequired ? `${this.placeholder} *` : this.placeholder;
    }

    public fieldValid(): boolean {
        return !(this.customControl?.invalid && (this.customControl?.touched || !this.customControl?.pristine));
    }
}
