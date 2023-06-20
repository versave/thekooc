export interface StoreError {
    message: string;
    error: unknown;
}

export type Nullable<T> = T | null;

export interface UpdateStateSlice<T, P> extends StateSlice<T> {
    requestArgs: P;
}

export interface StateSlice<T> {
    data: T;
    loading: boolean;
    loaded: boolean;
    error: Nullable<StoreError>;
}

export interface RequestStateSlice<T, P> extends StateSlice<T> {
    requestArgs: P;
}
