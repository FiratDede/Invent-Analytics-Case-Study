export type GenericObject = {
  [key: string]: any;  // Index signature to allow dynamic keys
};
export type Db = {
  dbName: string;
  dbUsername: string;
  dbPassword: string;
  dbHost: string;
  dbPort: number;
};

export type GetUserRequestParams = {
  userId: number;
}
export type GetBookRequestParams = {
  bookId: number;
}

export type BorrowBookRequestParams = {
  userId: number;
  bookId: number;
}

export type ReturnBookRequestParams = {
  userId: number;
  bookId: number;
}