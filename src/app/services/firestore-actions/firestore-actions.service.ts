import { Injectable } from '@angular/core';
import { collection, Firestore, addDoc, setDoc, doc, getDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Collections } from '../../models/collections.enum';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { DocumentReference } from '@firebase/firestore';
import { DocumentSnapshot, CollectionReference } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root',
})
export class FirestoreActionsService {
    constructor(private firestore: Firestore) {}

    public addDoc<T>(collectionName: Collections, data: T): Observable<DocumentReference> {
        return fromPromise(addDoc(this.getCollectionInstance(collectionName), data as any));
    }

    public setDoc<T>(collectionName: Collections, ref: string, data: T): Observable<void> {
        const docRef = doc(this.firestore, collectionName, ref);
        return fromPromise(setDoc(docRef, data as unknown));
    }

    public getDocByRef<T>(collectionName: Collections, ref: string): Observable<DocumentSnapshot<T>> {
        const docRef = doc(this.firestore, collectionName, ref) as DocumentReference<T>;
        return fromPromise(getDoc<T>(docRef));
    }

    public deleteDocByRef(collectionName: Collections, ref: string): Observable<void> {
        const docRef = doc(this.firestore, collectionName, ref);
        return fromPromise(deleteDoc(docRef));
    }

    private getCollectionInstance(collectionName: Collections): CollectionReference {
        return collection(this.firestore, collectionName);
    }
}
