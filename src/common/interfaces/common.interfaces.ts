export interface DeleteResponse<T> {
  message: string;
  deletedItem: T;
}

export interface EntityServiceValidations {
  [key: string]: any;
}
