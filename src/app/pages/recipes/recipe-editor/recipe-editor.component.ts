import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    AbstractControl,
    FormArray,
    FormControl,
    ReactiveFormsModule,
    UntypedFormControl,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { InputFieldComponent } from '../../../components/input-field/input-field.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { categories, tags } from '../../../static-data/static-data';
import { CheckboxComponent } from '../../../components/checkbox/checkbox.component';
import { ImageUploadComponent } from '../../../components/image-upload/image-upload.component';
import { CategoryTag, NewRecipeArgs, RecipeObject, UpdateRecipeArgs } from '../../../models/recipe.model';
import { filter, Observable, combineLatest } from 'rxjs';
import { UserModel } from '../../../models/user.model';
import { AuthFacade } from '../../../store/auth/services/auth.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { RecipeFacade } from '../../../store/recipe/services/recipe.facade';
import { ActivatedRoute } from '@angular/router';

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
    templateUrl: './recipe-editor.component.html',
    styleUrls: ['./recipe-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeEditorComponent implements OnInit {
    public singInUserData$: Observable<UserModel | null> = this.authFacade.userData$;

    public getRecipeData$: Observable<RecipeObject | null> = this.recipeFacade.getRecipeData$;
    private getRecipeLoading$: Observable<boolean> = this.recipeFacade.getRecipeLoading$;
    private addRecipeLoading$: Observable<boolean> = this.recipeFacade.addRecipeLoading$;
    private updateRecipeLoading$: Observable<boolean> = this.recipeFacade.updateRecipeLoading$;

    public form = new UntypedFormGroup({
        [FormControls.images]: new FormArray([
            new UntypedFormControl(null, []),
            new UntypedFormControl(null, []),
            new UntypedFormControl(null, []),
            new UntypedFormControl(null, []),
            new UntypedFormControl(null, []),
            new UntypedFormControl(null, []),
            new UntypedFormControl(null, []),
            new UntypedFormControl(null, []),
        ]),
        [FormControls.name]: new FormControl(null, [Validators.required]),
        [FormControls.serves]: new FormControl(null, [Validators.required, Validators.pattern(/^(0|[1-9][0-9]*)$/)]),
        [FormControls.hours]: new FormControl(null, [
            Validators.required,
            Validators.pattern(/^(0|[1-9][0-9]*)$/),
            Validators.maxLength(2),
        ]),
        [FormControls.categories]: new FormArray(categories.map(() => new FormControl(false))),
        [FormControls.tags]: new FormArray(tags.map(() => new FormControl(false))),
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
    public isEditMode = false;
    public formLoading = false;
    public readonly ingredientControlMultiplier = 3;
    public readonly stepControlMultiplier = 2;

    private user: UserModel;
    private editedRecipeId: string;

    constructor(
        private authFacade: AuthFacade,
        private recipeFacade: RecipeFacade,
        private cdr: ChangeDetectorRef,
        private route: ActivatedRoute
    ) {}

    public ngOnInit(): void {
        this.setUser();
        this.getRecipe();
        this.handleLoading();
    }

    public submitForm(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        if (this.isEditMode) {
            this.recipeFacade.updateRecipe(this.editedRecipeId, this.makeRequestFields(this.form) as UpdateRecipeArgs);
        } else {
            this.recipeFacade.addRecipe(this.makeRequestFields(this.form) as NewRecipeArgs);
        }
    }

    public getFormArray(control: FormControls): AbstractControl[] {
        return (this.form.get(control) as FormArray).controls;
    }

    public addMoreControlsOfType(control: FormControls, quantity: number): void {
        const controls = new Array(quantity).fill(null).map(() => new FormControl(null, []));
        this.form.setControl(control, new FormArray([...this.getFormArray(control), ...controls]));
    }

    public handleImageChange(event: Event | null, idx: number): void {
        if (event === null) {
            this.patchFormArrayControl(FormControls.images, idx, null);
            this.cdr.detectChanges();
            return;
        }

        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        const fileReader = new FileReader();
        let imageUrl: string;

        fileReader.readAsDataURL(file as Blob);
        fileReader.onload = async () => {
            imageUrl = fileReader.result as string;

            this.patchFormArrayControl(FormControls.images, idx, { file, imageUrl });
            this.cdr.detectChanges();
        };
    }

    private makeRequestFields(form: UntypedFormGroup): NewRecipeArgs | UpdateRecipeArgs {
        const ingredients = this.getFormArray(FormControls.ingredients)
            ?.map((control) => control.value)
            ?.filter(Boolean);
        const steps = this.getFormArray(FormControls.steps)
            ?.map((control) => control.value)
            ?.filter(Boolean);

        const requestFields = {
            title: form.get(FormControls.name)?.value,
            private: form.get(FormControls.private)?.value,
            serves: parseInt(form.get(FormControls.serves)?.value),
            cookingTime: this.convertHoursAndMinutesToMilliseconds(
                parseInt(form.get(FormControls.hours)?.value),
                parseInt(form.get(FormControls.minutes)?.value)
            ),
            steps,
            ingredients,
            categories: this.getCategoryTags(this.categories, form.get(FormControls.categories)?.value),
            tags: this.getCategoryTags(this.tags, form.get(FormControls.tags)?.value),
            author: this.user,
        };

        if (this.isEditMode) {
            return {
                ...requestFields,
                images: this.form.get(FormControls.images)?.value,
            } as UpdateRecipeArgs;
        } else {
            const images: File[] = this.getFormArray(FormControls.images)
                .map((control) => control.value?.file)
                ?.filter(Boolean);

            return {
                ...requestFields,
                images,
            } as NewRecipeArgs;
        }
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

    private setUser(): void {
        this.singInUserData$
            .pipe(
                filter((user) => !!user),
                untilDestroyed(this)
            )
            .subscribe((user) => (this.user = user as UserModel));
    }

    private patchFormArrayControl(control: FormControls, idx: number, value: unknown): void {
        (this.form.get(control) as FormArray).at(idx).patchValue(value);
    }

    private getRecipe(): void {
        this.getRecipeData$
            .pipe(
                filter(Boolean),
                filter(() => this.isEditMode),
                untilDestroyed(this)
            )
            .subscribe((recipe) => this.populateEditForm(recipe));

        this.route.params.pipe(untilDestroyed(this)).subscribe(({ id }) => {
            if (id) {
                this.isEditMode = true;
                this.editedRecipeId = id;
                this.recipeFacade.getRecipe(id);
            }
        });
    }

    private populateEditForm(recipe: RecipeObject): void {
        this.form.patchValue({
            [FormControls.name]: recipe.title,
            [FormControls.private]: recipe.private,
            [FormControls.serves]: recipe.serves,
            [FormControls.hours]: this.convertMillisecondsToHoursAndMinutes(recipe.cookingTime).hours,
            [FormControls.minutes]: this.convertMillisecondsToHoursAndMinutes(recipe.cookingTime).minutes,
        });

        recipe.images.forEach((image, idx) => {
            const imageControlValue = { imageUrl: image, file: null };

            this.patchFormArrayControl(FormControls.images, idx, imageControlValue);
        });

        this.patchStringFormArray(FormControls.ingredients, recipe.ingredients, this.ingredientControlMultiplier);
        this.patchStringFormArray(FormControls.steps, recipe.steps, this.stepControlMultiplier);
        this.patchCategoryTagsFormArrays(FormControls.categories, this.categories, recipe.categories);
        this.patchCategoryTagsFormArrays(FormControls.tags, this.tags, recipe.tags);
    }

    private patchCategoryTagsFormArrays(
        formControl: FormControls,
        categoryTags: CategoryTag[],
        recipeCategoryTags: CategoryTag[]
    ): void {
        categoryTags.forEach((categoryTag, idx) => {
            const exists = recipeCategoryTags?.find((recipeItem) => recipeItem.key === categoryTag.key);

            if (exists) {
                this.patchFormArrayControl(formControl, idx, true);
            }
        });
    }

    private patchStringFormArray(control: FormControls, recipeItemsArr: string[], controlMultiplier: number): void {
        const controlItemsCount = this.getFormArray(control).length;
        const recipeItemsCount = recipeItemsArr.length;
        const calculateAdditionalFields = controlItemsCount % controlMultiplier !== 0;
        let numberOfItemsToAdd = 0;

        if (calculateAdditionalFields) {
            const remainder = Math.abs((controlItemsCount % controlMultiplier) - controlMultiplier);
            numberOfItemsToAdd = Math.abs(controlItemsCount - (remainder + recipeItemsCount));
        } else {
            numberOfItemsToAdd = Math.abs(controlItemsCount - recipeItemsCount);
        }

        if (numberOfItemsToAdd + recipeItemsCount > controlItemsCount) {
            this.addMoreControlsOfType(control, numberOfItemsToAdd);
        }

        this.form.patchValue({ [control]: recipeItemsArr });
    }

    private handleLoading(): void {
        combineLatest([this.getRecipeLoading$, this.addRecipeLoading$, this.updateRecipeLoading$])
            .pipe(untilDestroyed(this))
            .subscribe((recipeLoading) => {
                this.formLoading = recipeLoading.some((loading) => loading);
                this.cdr.detectChanges();
            });
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
