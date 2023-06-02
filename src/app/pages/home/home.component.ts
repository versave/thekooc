import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardGridComponent } from '../../components/CardGrid/card-grid.component';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { IntroComponent } from './components/Intro/intro.component';
import { RecipesPreviewComponent } from './components/RecipesPreview/recipes-preview.component';
import { CategoriesPreviewComponent } from './components/CategoriesPreview/categories-preview.component';
import { CalloutComponent } from './components/Callout/callout.component';

@Component({
    selector: 'tk-home',
    standalone: true,
    imports: [CommonModule, IntroComponent, RecipesPreviewComponent, CategoriesPreviewComponent, CalloutComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
    // todo: Example of how to use firestore - remove
    // constructor(private firestore: Firestore) {}
    //
    // public executeFn(): void {
    //     const collectionInstance = collection(this.firestore, 'test-meals');
    //
    //     addDoc(collectionInstance, { name: 'test', tags: ['test', 'test2'] })
    //         .then((docRef) => {
    //             console.log('Document written with ID: ', docRef.id);
    //         })
    //         .catch((error) => {
    //             console.error('Error adding document: ', error);
    //         });
    // }
}
