import { FieldPath, WhereFilterOp } from '@firebase/firestore';

export interface WhereCondition {
    fieldPath: string | FieldPath;
    opStr: WhereFilterOp;
    value: unknown;
}

export interface FilterValues {
    [FilterType.category]: string[];
    [FilterType.tag]: string[];
}

export interface FilterRequest {
    conditions: WhereCondition[];
    isOrQuery: boolean;
}

export enum FilterType {
    category = 'category',
    tag = 'tag',
}
