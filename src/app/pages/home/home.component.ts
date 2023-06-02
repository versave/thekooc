import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardGridComponent } from '../../components/CardGrid/card-grid.component';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { getRecipeMocks } from '../../mocks/recipe.mock';
import { categoryCards } from '../../mocks/category.mock';
import { CategoryCard } from '../../models/category.model';
import { CategoryCardComponent } from '../../components/CategoryCard/category-card.component';

@Component({
    selector: 'tk-home',
    standalone: true,
    imports: [CommonModule, CardGridComponent, CategoryCardComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
    // todo: Remove mocks and use firestore data
    public cardMocks = getRecipeMocks();
    public categoryMocks = categoryCards;

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

    public trackCategoryByFn(index: number, item: CategoryCard): string {
        return item.id;
    }
}
