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
    and,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Collections } from '../../models/collections.enum';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import {
    DocumentReference,
    QuerySnapshot,
    DocumentSnapshot,
    CollectionReference,
    Query,
    QueryConstraint,
    QueryNonFilterConstraint,
} from '@firebase/firestore';
import { FilterRequest, WhereCondition } from '../../models/filter.model';

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
            const additionalFiltersArr = filterRequest?.additionalFilters?.length
                ? filterRequest?.additionalFilters
                : [];

            const queryRef = filterRequest?.isOrQuery
                ? query(collectionRef, or(...mappedWhereConditions), ...additionalFiltersArr)
                : query(collectionRef, ...mappedWhereConditions, ...additionalFiltersArr);

            return fromPromise(getDocs<T>(queryRef));
        }
    }

    public queryUserCollectionDocs<T>(
        collectionName: Collections,
        userWhereCondition: WhereCondition,
        filterRequest?: FilterRequest
    ): Observable<QuerySnapshot<T>> {
        const collectionRef = this.getCollectionInstance<T>(collectionName);
        const userCondition = where(userWhereCondition.fieldPath, userWhereCondition.opStr, userWhereCondition.value);

        if (!filterRequest?.conditions?.length) {
            const queryRef = query(collectionRef, userCondition);
            return fromPromise(getDocs<T>(queryRef));
        } else {
            const mappedWhereConditions = filterRequest.conditions.map(({ fieldPath, opStr, value }) =>
                where(fieldPath, opStr, value)
            );
            const userCondition = where(
                userWhereCondition.fieldPath,
                userWhereCondition.opStr,
                userWhereCondition.value
            );

            const queryRef = filterRequest?.isOrQuery
                ? query(collectionRef, and(userCondition, or(...mappedWhereConditions)))
                : query(collectionRef, ...mappedWhereConditions, userCondition);

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
