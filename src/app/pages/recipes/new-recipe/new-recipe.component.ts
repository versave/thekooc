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
import { ImageUploadComponent } from '../../../components/image-upload/image-upload.component';
import { CategoryTag, NewRecipeRequest } from '../../../models/recipe.model';
import { filter, Observable } from 'rxjs';
import { UserModel } from '../../../models/user.model';
import { AuthFacade } from '../../../store/auth/services/auth.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { RecipeFacade } from '../../../store/recipe/services/recipe.facade';

@UntilDestroy()
@Component({
    selector: 'tk-new-recipe',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputFieldComponent,
        ButtonComponent,
        CheckboxComponent,
        ImageUploadComponent,
    ],
    templateUrl: './new-recipe.component.html',
    styleUrls: ['./new-recipe.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewRecipeComponent implements OnInit {
    public singInUserData$: Observable<UserModel | null> = this.authFacade.userData$;

    public form = new UntypedFormGroup({
        [FormControls.images]: new FormArray([
            new FormControl(null, []),
            new FormControl(null, []),
            new FormControl(null, []),
            new FormControl(null, []),
            new FormControl(null, []),
            new FormControl(null, []),
            new FormControl(null, []),
            new FormControl(null, []),
        ]),
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
        [FormControls.steps]: new FormArray([
            new FormControl(null, [Validators.required]),
            new FormControl(null, []),
            new FormControl(null, []),
            new FormControl(null, []),
        ]),
        [FormControls.private]: new FormControl(false, []),
    });
    public formControls = FormControls;
    public categories = categories;
    public tags = tags;
    private user: UserModel;

    constructor(private authFacade: AuthFacade, private recipeFacade: RecipeFacade) {}

    public ngOnInit(): void {
        this.setUser();
        this.setFormFields();
    }

    public submitForm(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.recipeFacade.addRecipe(this.makeRequestFields(this.form));
    }

    public getFormArray(control: FormControls): AbstractControl[] {
        return (this.form.get(control) as FormArray).controls;
    }

    public addMoreControlsOfType(control: FormControls, quantity: number): void {
        const controls = new Array(quantity).fill(null).map(() => new FormControl(null, []));
        this.form.setControl(control, new FormArray([...this.getFormArray(control), ...controls]));
    }

    public handleImageChange(event: any): void {
        console.log('event', event);
    }

    private makeRequestFields(form: UntypedFormGroup): NewRecipeRequest {
        return {
            title: form.get(FormControls.name)?.value,
            private: form.get(FormControls.private)?.value,
            serves: parseInt(form.get(FormControls.serves)?.value),
            cookingTime: this.convertHoursAndMinutesToMilliseconds(
                parseInt(form.get(FormControls.hours)?.value),
                parseInt(form.get(FormControls.minutes)?.value)
            ),
            steps: form.get(FormControls.steps)?.value,
            ingredients: form.get(FormControls.ingredients)?.value,
            categories: this.getCategoryTags(this.categories, form.get(FormControls.categories)?.value),
            tags: this.getCategoryTags(this.tags, form.get(FormControls.tags)?.value),
            author: this.user,
        };
    }

    private convertHoursAndMinutesToMilliseconds(hours: number, minutes: number): number {
        return (hours * 60 + minutes) * 60 * 1000;
    }

    private convertMillisecondsToHoursAndMinutes(milliseconds: number): { hours: number; minutes: number } {
        const hours = Math.floor(milliseconds / 1000 / 60 / 60);
        const minutes = Math.floor((milliseconds / 1000 / 60 / 60 - hours) * 60);

        return { hours, minutes };
    }

    private getCategoryTags(referenceArr: CategoryTag[], formBoolArr: boolean[]): CategoryTag[] {
        return referenceArr.filter((_, index) => formBoolArr[index]);
    }

    private setFormFields(): void {
        this.form.addControl(FormControls.categories, new FormArray(this.categories.map(() => new FormControl(false))));
        this.form.addControl(FormControls.tags, new FormArray(this.tags.map(() => new FormControl(false))));
    }

    private setUser(): void {
        this.singInUserData$
            .pipe(
                filter((user) => !!user),
                untilDestroyed(this)
            )
            .subscribe((user) => (this.user = user as UserModel));
    }
}

enum FormControls {
    name = 'name',
    private = 'private',
    categories = 'categories',
    tags = 'tags',
    serves = 'serves',
    hours = 'hours',
    minutes = 'minutes',
    ingredients = 'ingredients',
    steps = 'steps',
    images = 'images',
}
