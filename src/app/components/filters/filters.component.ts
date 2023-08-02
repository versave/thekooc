import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandableSectionComponent } from '../expandable-section/expandable-section.component';
import { staticCategories, staticTags } from '../../static-data/static-data';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { AbstractControl, FormArray, FormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { FilterType, FilterValues } from '../../models/filter.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject } from 'rxjs';

@UntilDestroy()
@Component({
    selector: 'tk-filters',
    standalone: true,
    imports: [CommonModule, ExpandableSectionComponent, CheckboxComponent],
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit {
    @Output() public activatedFiltersEvent: EventEmitter<FilterValues> = new EventEmitter<FilterValues>();

    public form = new UntypedFormGroup({
        [FormControls.categories]: new FormArray(staticCategories.map(() => new FormControl(false))),
        [FormControls.tags]: new FormArray(staticTags.map(() => new FormControl(false))),
    });
    public formControls = FormControls;
    public categories = staticCategories;
    public tags = staticTags;
    public filterType = FilterType;

    private activatedFilters$: Subject<FilterValues> = new Subject<FilterValues>();
    private selectedFilters: FilterValues = {
        [FilterType.category]: [],
        [FilterType.tag]: [],
    };

    constructor(private route: ActivatedRoute) {}

    public ngOnInit(): void {
        this.listenToQueryParams();
        this.listenToFilterChanges();
    }

    public getFormArray(control: FormControls): AbstractControl[] {
        return (this.form.get(control) as FormArray).controls;
    }

    public onCategoryTagChange(checked: boolean, filterType: FilterType, key: string): void {
        const filterItems = this.selectedFilters[filterType];

        if (checked && !filterItems.includes(key)) {
            this.selectedFilters[filterType] = [...filterItems, key];
        } else if (!checked && filterItems.includes(key)) {
            this.selectedFilters[filterType] = filterItems.filter((value) => value !== key);
        }

        this.activatedFilters$.next(this.selectedFilters);
    }

    private listenToQueryParams(): void {
        this.route.queryParams.pipe(untilDestroyed(this)).subscribe((params) => this.setFiltersFromQueryParams(params));
    }

    private listenToFilterChanges(): void {
        this.activatedFilters$
            .pipe(untilDestroyed(this))
            .subscribe((activatedFilters) => this.activatedFiltersEvent.emit(activatedFilters));
    }

    private setFiltersFromQueryParams(params: Params): void {
        const filterValues = Object.values(FilterType);

        filterValues.forEach((filterType) => {
            const filterItems = params[filterType];

            if (filterItems) {
                this.selectedFilters[filterType] = Array.isArray(filterItems) ? filterItems : [filterItems];
            }
        });

        this.patchFormFilters(this.selectedFilters);
    }

    private patchFormFilters(selectedFilters: FilterValues): void {
        this.form.controls[FormControls.categories] = new FormArray(
            staticCategories.map(
                (categoryTag) => new FormControl(selectedFilters[FilterType.category].includes(categoryTag.key))
            )
        );
        this.form.controls[FormControls.tags] = new FormArray(
            staticTags.map((categoryTag) => new FormControl(selectedFilters[FilterType.tag].includes(categoryTag.key)))
        );
    }
}

enum FormControls {
    categories = 'categories',
    tags = 'tags',
}
