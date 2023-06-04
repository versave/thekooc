import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipesPreviewComponent } from './recipes-preview.component';

describe('RecipesPreviewComponent', () => {
    let component: RecipesPreviewComponent;
    let fixture: ComponentFixture<RecipesPreviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RecipesPreviewComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(RecipesPreviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
