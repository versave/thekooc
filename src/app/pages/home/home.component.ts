import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroComponent } from './components/intro/intro.component';
import { RecipesPreviewComponent } from './components/recipes-preview/recipes-preview.component';
import { CategoriesPreviewComponent } from './components/categories-preview/categories-preview.component';
import { CalloutComponent } from './components/callout/callout.component';

@Component({
    selector: 'tk-home',
    standalone: true,
    imports: [CommonModule, IntroComponent, RecipesPreviewComponent, CategoriesPreviewComponent, CalloutComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
