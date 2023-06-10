import { ChangeDetectorRef, Directive, DoCheck, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive()
export class CustomFormControl implements DoCheck {
    @Input() public customControl: AbstractControl | null = null;

    private controlTouched = false;

    constructor(private cdr: ChangeDetectorRef) {}

    public ngDoCheck(): void {
        if (this.controlTouched !== this.customControl?.touched) {
            this.controlTouched = !!this.customControl?.touched;
            this.cdr.detectChanges();
        }
    }
}
