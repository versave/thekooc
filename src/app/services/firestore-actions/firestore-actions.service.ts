import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc, setDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Collections } from '../../models/collections.enum';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { DocumentReference } from '@firebase/firestore';

@Injectable({
    providedIn: 'root',
})
export class FirestoreActionsService {
    constructor(private firestore: Firestore) {}

    public addDoc<T>(collectionName: Collections, data: T): Observable<DocumentReference> {
        return fromPromise(addDoc(this.getCollectionInstance(collectionName), { data }));
    }

    public addDocWithRef<T>(collectionName: Collections, ref: string, data: T): Observable<void> {
        const docRef = doc(this.firestore, collectionName, ref);
        return fromPromise(setDoc(docRef, data as unknown));
    }

    private getCollectionInstance(collectionName: Collections) {
        return collection(this.firestore, collectionName);
    }
}
