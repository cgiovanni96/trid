export type User = {
  id: string;
  username: string;
  name: string;
  bio: string;
  image: string;
};

export type MongooseFetchProperties = {
  _id: string;
  __v: number;
};

export type PagingParams = {
  pageNumber?: number;
  pageSize?: number;
};
