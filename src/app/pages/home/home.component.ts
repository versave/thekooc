import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardGridComponent } from '../../components/CardGrid/card-grid.component';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Component({
    selector: 'tk-home',
    standalone: true,
    imports: [CommonModule, CardGridComponent],
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
