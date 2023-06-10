import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    AbstractControl,
    FormArray,
    FormControl,
    ReactiveFormsModule,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { InputFieldComponent } from '../../../components/input-field/input-field.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { categories, tags } from '../../../mocks/category.mock';
import { CheckboxComponent } from '../../../components/checkbox/checkbox.component';

@Component({
    selector: 'tk-new-recipe',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, InputFieldComponent, ButtonComponent, CheckboxComponent],
    templateUrl: './new-recipe.component.html',
    styleUrls: ['./new-recipe.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewRecipeComponent implements OnInit {
    public form = new UntypedFormGroup({
        [FormControls.name]: new FormControl(null, [Validators.required]),
        [FormControls.serves]: new FormControl(null, [Validators.required, Validators.pattern(/^(0|[1-9][0-9]*)$/)]),
        [FormControls.hours]: new FormControl(null, [
            Validators.required,
            Validators.pattern(/^(0|[1-9][0-9]*)$/),
            Validators.maxLength(2),
        ]),
        [FormControls.minutes]: new FormControl(null, [
            Validators.required,
            Validators.pattern(/^(0|[1-9][0-9]*)$/),
            Validators.maxLength(2),
        ]),
        [FormControls.ingredients]: new FormArray([
            new FormControl(null, [Validators.required]),
            new FormControl(null, []),
            new FormControl(null, []),
            new FormControl(null, []),
            new FormControl(null, []),
            new FormControl(null, []),
        ]),
    });
    public formControls = FormControls;
    public categories = categories;
    public tags = tags;

    public ngOnInit(): void {
        this.form.addControl(FormControls.categories, new FormArray(this.categories.map(() => new FormControl(false))));
        this.form.addControl(FormControls.tags, new FormArray(this.tags.map(() => new FormControl(false))));
    }

    public submitForm(): void {
        console.log(this.form);

        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
    }

    public getFormArray(control: FormControls): AbstractControl[] {
        return (this.form.get(control) as FormArray).controls;
    }

    public addMoreControlsOfType(control: FormControls): void {
        const controls = [new FormControl(null, []), new FormControl(null, []), new FormControl(null, [])];
        this.form.setControl(control, new FormArray([...this.getFormArray(control), ...controls]));
    }
}

enum FormControls {
    name = 'name',
    categories = 'categories',
    tags = 'tags',
    serves = 'serves',
    hours = 'hours',
    minutes = 'minutes',
    ingredients = 'ingredients',
    steps = 'steps',
}
