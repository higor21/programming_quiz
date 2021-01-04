export type PaginationParams = {
  page?: number;
  pageSize?: number;
}

export type QResultParams = {
  wasRight: boolean;
  nAttemptsToHit: number | undefined;
  wasAnswered: boolean;
  idQuestion: number | string;
  nQuestion: number | string;
}

export type UserResultParams = {user: string | undefined, result: QResultParams[]}
