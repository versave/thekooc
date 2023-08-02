import { Injectable } from '@angular/core';
import {
    collection,
    Firestore,
    addDoc,
    setDoc,
    doc,
    getDoc,
    deleteDoc,
    getDocs,
    query,
    where,
    or,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Collections } from '../../models/collections.enum';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { DocumentReference, QuerySnapshot, DocumentSnapshot, CollectionReference } from '@firebase/firestore';
import { FilterRequest } from '../../models/filter.model';

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

    public queryCollectionDocs<T>(
        collectionName: Collections,
        filterRequest?: FilterRequest
    ): Observable<QuerySnapshot<T>> {
        const collectionRef = this.getCollectionInstance<T>(collectionName);

        if (!filterRequest?.conditions?.length) {
            return fromPromise(getDocs<T>(collectionRef));
        } else {
            const mappedWhereConditions = filterRequest.conditions.map(({ fieldPath, opStr, value }) =>
                where(fieldPath, opStr, value)
            );
            const queryRef = filterRequest?.isOrQuery
                ? query(collectionRef, or(...mappedWhereConditions))
                : query(collectionRef, ...mappedWhereConditions);

            return fromPromise(getDocs<T>(queryRef));
        }
    }

    public getDocByRef<T>(collectionName: Collections, ref: string): Observable<DocumentSnapshot<T>> {
        const docRef = doc(this.firestore, collectionName, ref) as DocumentReference<T>;
        return fromPromise(getDoc<T>(docRef));
    }

    public deleteDocByRef(collectionName: Collections, ref: string): Observable<void> {
        const docRef = doc(this.firestore, collectionName, ref);
        return fromPromise(deleteDoc(docRef));
    }

    private getCollectionInstance<T>(collectionName: Collections): CollectionReference<T> {
        return collection(this.firestore, collectionName) as CollectionReference<T>;
    }
}
