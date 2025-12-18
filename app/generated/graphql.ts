import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: { input: bigint; output: bigint; }
  /** The `Byte` scalar type represents byte value as a Buffer */
  Bytes: { input: any; output: any; }
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: Date | string; output: Date | string; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: Date | string; output: Date | string; }
  /** A field whose value is a hexadecimal: https://en.wikipedia.org/wiki/Hexadecimal. */
  Decimal: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  Json: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type BooleanInputOperator = {
  arrayContained?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  arrayContains?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  arrayOverlaps?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Boolean']['input']>;
  gte?: InputMaybe<Scalars['Boolean']['input']>;
  ilike?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['Boolean']['input']>;
  lte?: InputMaybe<Scalars['Boolean']['input']>;
  ne?: InputMaybe<Scalars['Boolean']['input']>;
  notIlike?: InputMaybe<Scalars['Boolean']['input']>;
  notIn?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  notLike?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BucketObject = {
  __typename?: 'BucketObject';
  cors?: Maybe<Array<CorsObject>>;
  defaultEventBasedHold?: Maybe<Scalars['Boolean']['output']>;
  encryption?: Maybe<EncryptionObject>;
  etag?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  kind?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  metageneration?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  projectNumber?: Maybe<Scalars['String']['output']>;
  selfLink?: Maybe<Scalars['String']['output']>;
  storageClass?: Maybe<Scalars['String']['output']>;
  timeCreated?: Maybe<Scalars['String']['output']>;
  updated?: Maybe<Scalars['String']['output']>;
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  posts: Array<Post>;
  postsCount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type CategoryPostsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PostOrderBy>;
  where?: InputMaybe<PostWhere>;
};


export type CategoryPostsCountArgs = {
  where?: InputMaybe<PostWhere>;
};

export type CategoryCreate = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CategoryInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CategoryOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

export type CategoryWhere = {
  AND?: InputMaybe<Array<CategoryWhere>>;
  NOT?: InputMaybe<CategoryWhere>;
  OR?: InputMaybe<Array<CategoryWhere>>;
  createdAt?: InputMaybe<DateTimeInputOperator>;
  id?: InputMaybe<StringInputOperator>;
  name?: InputMaybe<StringInputOperator>;
  updatedAt?: InputMaybe<DateTimeInputOperator>;
};

export type Category_ = {
  __typename?: 'Category_';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CorsInput = {
  maxAgeSeconds?: InputMaybe<Scalars['Int']['input']>;
  method?: InputMaybe<Array<Scalars['String']['input']>>;
  origin?: InputMaybe<Array<Scalars['String']['input']>>;
  responseHeader?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CorsObject = {
  __typename?: 'CorsObject';
  maxAgeSeconds?: Maybe<Scalars['Int']['output']>;
  method?: Maybe<Array<Scalars['String']['output']>>;
  origin?: Maybe<Array<Scalars['String']['output']>>;
  responseHeader?: Maybe<Array<Scalars['String']['output']>>;
};

export type DateTimeInputOperator = {
  arrayContained?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  arrayContains?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  arrayOverlaps?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  ilike?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['DateTime']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  ne?: InputMaybe<Scalars['DateTime']['input']>;
  notIlike?: InputMaybe<Scalars['DateTime']['input']>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  notLike?: InputMaybe<Scalars['DateTime']['input']>;
};

export type EncryptionObject = {
  __typename?: 'EncryptionObject';
  defaultKmsKeyName?: Maybe<Scalars['String']['output']>;
};

export type FireStore = {
  __typename?: 'FireStore';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  mimeType: Scalars['String']['output'];
  name: Scalars['String']['output'];
  postCards: Array<Post>;
  postCardsCount: Scalars['Int']['output'];
  posts: Array<Post>;
  postsCount: Scalars['Int']['output'];
  systemCards: Array<System>;
  systemCardsCount: Scalars['Int']['output'];
  systemIcons: Array<System>;
  systemIconsCount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type FireStorePostCardsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PostOrderBy>;
  where?: InputMaybe<PostWhere>;
};


export type FireStorePostCardsCountArgs = {
  where?: InputMaybe<PostWhere>;
};


export type FireStorePostsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PostOrderBy>;
  where?: InputMaybe<PostWhere>;
};


export type FireStorePostsCountArgs = {
  where?: InputMaybe<PostWhere>;
};


export type FireStoreSystemCardsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SystemOrderBy>;
  where?: InputMaybe<SystemWhere>;
};


export type FireStoreSystemCardsCountArgs = {
  where?: InputMaybe<SystemWhere>;
};


export type FireStoreSystemIconsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SystemOrderBy>;
  where?: InputMaybe<SystemWhere>;
};


export type FireStoreSystemIconsCountArgs = {
  where?: InputMaybe<SystemWhere>;
};

export type FireStoreCreate = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['String']['input'];
  mimeType: Scalars['String']['input'];
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type FireStoreInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type FireStoreOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  mimeType?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

export type FireStoreWhere = {
  AND?: InputMaybe<Array<FireStoreWhere>>;
  NOT?: InputMaybe<FireStoreWhere>;
  OR?: InputMaybe<Array<FireStoreWhere>>;
  createdAt?: InputMaybe<DateTimeInputOperator>;
  id?: InputMaybe<StringInputOperator>;
  mimeType?: InputMaybe<StringInputOperator>;
  name?: InputMaybe<StringInputOperator>;
  updatedAt?: InputMaybe<DateTimeInputOperator>;
};

export type FireStore_ = {
  __typename?: 'FireStore_';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  mimeType: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  backup: Scalars['String']['output'];
  bucket?: Maybe<BucketObject>;
  createManyCategory: Array<Category>;
  createManyFireStore: Array<FireStore>;
  createManyPost: Array<Post>;
  createManySystem: Array<System>;
  createManyUser: Array<User>;
  createMany_CategoryToPost: Array<_CategoryToPost>;
  createMany_FireStoreToPost: Array<_FireStoreToPost>;
  createOneCategory: Category;
  createOneFireStore: FireStore;
  createOnePost: Post;
  createOneSystem: System;
  createOneUser: User;
  createOne_CategoryToPost: _CategoryToPost;
  createOne_FireStoreToPost: _FireStoreToPost;
  deleteCategory: Array<Category_>;
  deleteFireStore: Array<FireStore_>;
  deletePost: Array<Post_>;
  deleteSystem: Array<System_>;
  deleteUser: Array<User_>;
  delete_CategoryToPost: Array<_CategoryToPost_>;
  delete_FireStoreToPost: Array<_FireStoreToPost_>;
  normalizationPostFiles?: Maybe<Scalars['Boolean']['output']>;
  restore?: Maybe<Scalars['Boolean']['output']>;
  restoreFiles?: Maybe<Array<FireStore>>;
  signIn?: Maybe<User>;
  updateCategory: Array<Category>;
  updateFireStore: Array<FireStore>;
  updatePost: Array<Post>;
  updateSystem: Array<System>;
  updateUser: Array<User>;
  update_CategoryToPost: Array<_CategoryToPost>;
  update_FireStoreToPost: Array<_FireStoreToPost>;
  uploadPostIcon?: Maybe<FireStore>;
  uploadPostImage: FireStore;
  uploadSystemIcon?: Maybe<FireStore>;
};


export type MutationBucketArgs = {
  cors?: InputMaybe<Array<CorsInput>>;
};


export type MutationCreateManyCategoryArgs = {
  input: Array<CategoryCreate>;
};


export type MutationCreateManyFireStoreArgs = {
  input: Array<FireStoreCreate>;
};


export type MutationCreateManyPostArgs = {
  input: Array<PostCreate>;
};


export type MutationCreateManySystemArgs = {
  input: Array<SystemCreate>;
};


export type MutationCreateManyUserArgs = {
  input: Array<UserCreate>;
};


export type MutationCreateMany_CategoryToPostArgs = {
  input: Array<_CategoryToPostCreate>;
};


export type MutationCreateMany_FireStoreToPostArgs = {
  input: Array<_FireStoreToPostCreate>;
};


export type MutationCreateOneCategoryArgs = {
  input: CategoryCreate;
};


export type MutationCreateOneFireStoreArgs = {
  input: FireStoreCreate;
};


export type MutationCreateOnePostArgs = {
  input: PostCreate;
};


export type MutationCreateOneSystemArgs = {
  input: SystemCreate;
};


export type MutationCreateOneUserArgs = {
  input: UserCreate;
};


export type MutationCreateOne_CategoryToPostArgs = {
  input: _CategoryToPostCreate;
};


export type MutationCreateOne_FireStoreToPostArgs = {
  input: _FireStoreToPostCreate;
};


export type MutationDeleteCategoryArgs = {
  where?: InputMaybe<CategoryWhere>;
};


export type MutationDeleteFireStoreArgs = {
  where?: InputMaybe<FireStoreWhere>;
};


export type MutationDeletePostArgs = {
  where?: InputMaybe<PostWhere>;
};


export type MutationDeleteSystemArgs = {
  where?: InputMaybe<SystemWhere>;
};


export type MutationDeleteUserArgs = {
  where?: InputMaybe<UserWhere>;
};


export type MutationDelete_CategoryToPostArgs = {
  where?: InputMaybe<_CategoryToPostWhere>;
};


export type MutationDelete_FireStoreToPostArgs = {
  where?: InputMaybe<_FireStoreToPostWhere>;
};


export type MutationNormalizationPostFilesArgs = {
  postId: Scalars['String']['input'];
  removeAll?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationRestoreArgs = {
  file: Scalars['Upload']['input'];
};


export type MutationRestoreFilesArgs = {
  files: Array<Scalars['Upload']['input']>;
};


export type MutationSignInArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateCategoryArgs = {
  input: CategoryInput;
  where?: InputMaybe<CategoryWhere>;
};


export type MutationUpdateFireStoreArgs = {
  input: FireStoreInput;
  where?: InputMaybe<FireStoreWhere>;
};


export type MutationUpdatePostArgs = {
  input: PostInput;
  where?: InputMaybe<PostWhere>;
};


export type MutationUpdateSystemArgs = {
  input: SystemInput;
  where?: InputMaybe<SystemWhere>;
};


export type MutationUpdateUserArgs = {
  input: UserInput;
  where?: InputMaybe<UserWhere>;
};


export type MutationUpdate_CategoryToPostArgs = {
  input: _CategoryToPostInput;
  where?: InputMaybe<_CategoryToPostWhere>;
};


export type MutationUpdate_FireStoreToPostArgs = {
  input: _FireStoreToPostInput;
  where?: InputMaybe<_FireStoreToPostWhere>;
};


export type MutationUploadPostIconArgs = {
  file?: InputMaybe<Scalars['Upload']['input']>;
  postId: Scalars['String']['input'];
};


export type MutationUploadPostImageArgs = {
  file: Scalars['Upload']['input'];
  postId: Scalars['String']['input'];
};


export type MutationUploadSystemIconArgs = {
  file: Scalars['Upload']['input'];
};

export enum OrderBy {
  Asc = 'Asc',
  Desc = 'Desc'
}

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  authorCount: Scalars['Int']['output'];
  authorId: Scalars['String']['output'];
  card?: Maybe<FireStore>;
  cardCount: Scalars['Int']['output'];
  cardId?: Maybe<Scalars['String']['output']>;
  categories: Array<Category>;
  categoriesCount: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  postFiles: Array<FireStore>;
  postFilesCount: Scalars['Int']['output'];
  published: Scalars['Boolean']['output'];
  publishedAt: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type PostAuthorArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UserOrderBy>;
  where?: InputMaybe<UserWhere>;
};


export type PostAuthorCountArgs = {
  where?: InputMaybe<UserWhere>;
};


export type PostCardArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FireStoreOrderBy>;
  where?: InputMaybe<FireStoreWhere>;
};


export type PostCardCountArgs = {
  where?: InputMaybe<FireStoreWhere>;
};


export type PostCategoriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CategoryOrderBy>;
  where?: InputMaybe<CategoryWhere>;
};


export type PostCategoriesCountArgs = {
  where?: InputMaybe<CategoryWhere>;
};


export type PostPostFilesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FireStoreOrderBy>;
  where?: InputMaybe<FireStoreWhere>;
};


export type PostPostFilesCountArgs = {
  where?: InputMaybe<FireStoreWhere>;
};

export type PostCreate = {
  authorId: Scalars['String']['input'];
  cardId?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  published: Scalars['Boolean']['input'];
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PostInput = {
  authorId?: InputMaybe<Scalars['String']['input']>;
  cardId?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PostOrderBy = {
  authorId?: InputMaybe<OrderBy>;
  cardId?: InputMaybe<OrderBy>;
  content?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  published?: InputMaybe<OrderBy>;
  publishedAt?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

export type PostWhere = {
  AND?: InputMaybe<Array<PostWhere>>;
  NOT?: InputMaybe<PostWhere>;
  OR?: InputMaybe<Array<PostWhere>>;
  authorId?: InputMaybe<StringInputOperator>;
  cardId?: InputMaybe<StringInputOperator>;
  content?: InputMaybe<StringInputOperator>;
  createdAt?: InputMaybe<DateTimeInputOperator>;
  id?: InputMaybe<StringInputOperator>;
  published?: InputMaybe<BooleanInputOperator>;
  publishedAt?: InputMaybe<DateTimeInputOperator>;
  title?: InputMaybe<StringInputOperator>;
  updatedAt?: InputMaybe<DateTimeInputOperator>;
};

export type Post_ = {
  __typename?: 'Post_';
  authorId: Scalars['String']['output'];
  cardId?: Maybe<Scalars['String']['output']>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  published: Scalars['Boolean']['output'];
  publishedAt: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  bucket?: Maybe<BucketObject>;
  countCategory: Scalars['Int']['output'];
  countFireStore: Scalars['Int']['output'];
  countPost: Scalars['Int']['output'];
  countSystem: Scalars['Int']['output'];
  countUser: Scalars['Int']['output'];
  count_CategoryToPost: Scalars['Int']['output'];
  count_FireStoreToPost: Scalars['Int']['output'];
  findFirstCategory?: Maybe<Category>;
  findFirstFireStore?: Maybe<FireStore>;
  findFirstPost?: Maybe<Post>;
  findFirstSystem?: Maybe<System>;
  findFirstUser?: Maybe<User>;
  findFirst_CategoryToPost?: Maybe<_CategoryToPost>;
  findFirst_FireStoreToPost?: Maybe<_FireStoreToPost>;
  findManyCategory: Array<Category>;
  findManyFireStore: Array<FireStore>;
  findManyPost: Array<Post>;
  findManySystem: Array<System>;
  findManyUser: Array<User>;
  findMany_CategoryToPost: Array<_CategoryToPost>;
  findMany_FireStoreToPost: Array<_FireStoreToPost>;
};


export type QueryCountCategoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CategoryWhere>;
};


export type QueryCountFireStoreArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FireStoreWhere>;
};


export type QueryCountPostArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PostWhere>;
};


export type QueryCountSystemArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SystemWhere>;
};


export type QueryCountUserArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserWhere>;
};


export type QueryCount_CategoryToPostArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<_CategoryToPostWhere>;
};


export type QueryCount_FireStoreToPostArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<_FireStoreToPostWhere>;
};


export type QueryFindFirstCategoryArgs = {
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CategoryOrderBy>;
  where?: InputMaybe<CategoryWhere>;
};


export type QueryFindFirstFireStoreArgs = {
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FireStoreOrderBy>;
  where?: InputMaybe<FireStoreWhere>;
};


export type QueryFindFirstPostArgs = {
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PostOrderBy>;
  where?: InputMaybe<PostWhere>;
};


export type QueryFindFirstSystemArgs = {
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SystemOrderBy>;
  where?: InputMaybe<SystemWhere>;
};


export type QueryFindFirstUserArgs = {
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UserOrderBy>;
  where?: InputMaybe<UserWhere>;
};


export type QueryFindFirst_CategoryToPostArgs = {
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<_CategoryToPostOrderBy>;
  where?: InputMaybe<_CategoryToPostWhere>;
};


export type QueryFindFirst_FireStoreToPostArgs = {
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<_FireStoreToPostOrderBy>;
  where?: InputMaybe<_FireStoreToPostWhere>;
};


export type QueryFindManyCategoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CategoryOrderBy>;
  where?: InputMaybe<CategoryWhere>;
};


export type QueryFindManyFireStoreArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FireStoreOrderBy>;
  where?: InputMaybe<FireStoreWhere>;
};


export type QueryFindManyPostArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PostOrderBy>;
  where?: InputMaybe<PostWhere>;
};


export type QueryFindManySystemArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SystemOrderBy>;
  where?: InputMaybe<SystemWhere>;
};


export type QueryFindManyUserArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UserOrderBy>;
  where?: InputMaybe<UserWhere>;
};


export type QueryFindMany_CategoryToPostArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<_CategoryToPostOrderBy>;
  where?: InputMaybe<_CategoryToPostWhere>;
};


export type QueryFindMany_FireStoreToPostArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<_FireStoreToPostOrderBy>;
  where?: InputMaybe<_FireStoreToPostWhere>;
};

export type StringInputOperator = {
  arrayContained?: InputMaybe<Array<Scalars['String']['input']>>;
  arrayContains?: InputMaybe<Array<Scalars['String']['input']>>;
  arrayOverlaps?: InputMaybe<Array<Scalars['String']['input']>>;
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  isNotNull?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  notIlike?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type System = {
  __typename?: 'System';
  card?: Maybe<FireStore>;
  cardCount: Scalars['Int']['output'];
  cardId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  icon?: Maybe<FireStore>;
  iconCount: Scalars['Int']['output'];
  iconId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type SystemCardArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FireStoreOrderBy>;
  where?: InputMaybe<FireStoreWhere>;
};


export type SystemCardCountArgs = {
  where?: InputMaybe<FireStoreWhere>;
};


export type SystemIconArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FireStoreOrderBy>;
  where?: InputMaybe<FireStoreWhere>;
};


export type SystemIconCountArgs = {
  where?: InputMaybe<FireStoreWhere>;
};

export type SystemCreate = {
  cardId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description: Scalars['String']['input'];
  iconId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  title: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SystemInput = {
  cardId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  iconId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SystemOrderBy = {
  cardId?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  description?: InputMaybe<OrderBy>;
  iconId?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

export type SystemWhere = {
  AND?: InputMaybe<Array<SystemWhere>>;
  NOT?: InputMaybe<SystemWhere>;
  OR?: InputMaybe<Array<SystemWhere>>;
  cardId?: InputMaybe<StringInputOperator>;
  createdAt?: InputMaybe<DateTimeInputOperator>;
  description?: InputMaybe<StringInputOperator>;
  iconId?: InputMaybe<StringInputOperator>;
  id?: InputMaybe<StringInputOperator>;
  title?: InputMaybe<StringInputOperator>;
  updatedAt?: InputMaybe<DateTimeInputOperator>;
};

export type System_ = {
  __typename?: 'System_';
  cardId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  iconId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  post: Array<Post>;
  postCount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type UserPostArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PostOrderBy>;
  where?: InputMaybe<PostWhere>;
};


export type UserPostCountArgs = {
  where?: InputMaybe<PostWhere>;
};

export type UserCreate = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  email?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

export type UserWhere = {
  AND?: InputMaybe<Array<UserWhere>>;
  NOT?: InputMaybe<UserWhere>;
  OR?: InputMaybe<Array<UserWhere>>;
  createdAt?: InputMaybe<DateTimeInputOperator>;
  email?: InputMaybe<StringInputOperator>;
  id?: InputMaybe<StringInputOperator>;
  name?: InputMaybe<StringInputOperator>;
  updatedAt?: InputMaybe<DateTimeInputOperator>;
};

export type User_ = {
  __typename?: 'User_';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type _CategoryToPost = {
  __typename?: '_CategoryToPost';
  category?: Maybe<Category>;
  categoryCount: Scalars['Int']['output'];
  categoryId: Scalars['String']['output'];
  post?: Maybe<Post>;
  postCount: Scalars['Int']['output'];
  postId: Scalars['String']['output'];
};


export type _CategoryToPostCategoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<CategoryOrderBy>;
  where?: InputMaybe<CategoryWhere>;
};


export type _CategoryToPostCategoryCountArgs = {
  where?: InputMaybe<CategoryWhere>;
};


export type _CategoryToPostPostArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PostOrderBy>;
  where?: InputMaybe<PostWhere>;
};


export type _CategoryToPostPostCountArgs = {
  where?: InputMaybe<PostWhere>;
};

export type _CategoryToPostCreate = {
  categoryId: Scalars['String']['input'];
  postId: Scalars['String']['input'];
};

export type _CategoryToPostInput = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  postId?: InputMaybe<Scalars['String']['input']>;
};

export type _CategoryToPostOrderBy = {
  categoryId?: InputMaybe<OrderBy>;
  postId?: InputMaybe<OrderBy>;
};

export type _CategoryToPostWhere = {
  AND?: InputMaybe<Array<_CategoryToPostWhere>>;
  NOT?: InputMaybe<_CategoryToPostWhere>;
  OR?: InputMaybe<Array<_CategoryToPostWhere>>;
  categoryId?: InputMaybe<StringInputOperator>;
  postId?: InputMaybe<StringInputOperator>;
};

export type _CategoryToPost_ = {
  __typename?: '_CategoryToPost_';
  categoryId: Scalars['String']['output'];
  postId: Scalars['String']['output'];
};

export type _FireStoreToPost = {
  __typename?: '_FireStoreToPost';
  fireStore?: Maybe<FireStore>;
  fireStoreCount: Scalars['Int']['output'];
  fireStoreId: Scalars['String']['output'];
  post?: Maybe<Post>;
  postCount: Scalars['Int']['output'];
  postId: Scalars['String']['output'];
};


export type _FireStoreToPostFireStoreArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<FireStoreOrderBy>;
  where?: InputMaybe<FireStoreWhere>;
};


export type _FireStoreToPostFireStoreCountArgs = {
  where?: InputMaybe<FireStoreWhere>;
};


export type _FireStoreToPostPostArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PostOrderBy>;
  where?: InputMaybe<PostWhere>;
};


export type _FireStoreToPostPostCountArgs = {
  where?: InputMaybe<PostWhere>;
};

export type _FireStoreToPostCreate = {
  fireStoreId: Scalars['String']['input'];
  postId: Scalars['String']['input'];
};

export type _FireStoreToPostInput = {
  fireStoreId?: InputMaybe<Scalars['String']['input']>;
  postId?: InputMaybe<Scalars['String']['input']>;
};

export type _FireStoreToPostOrderBy = {
  fireStoreId?: InputMaybe<OrderBy>;
  postId?: InputMaybe<OrderBy>;
};

export type _FireStoreToPostWhere = {
  AND?: InputMaybe<Array<_FireStoreToPostWhere>>;
  NOT?: InputMaybe<_FireStoreToPostWhere>;
  OR?: InputMaybe<Array<_FireStoreToPostWhere>>;
  fireStoreId?: InputMaybe<StringInputOperator>;
  postId?: InputMaybe<StringInputOperator>;
};

export type _FireStoreToPost_ = {
  __typename?: '_FireStoreToPost_';
  fireStoreId: Scalars['String']['output'];
  postId: Scalars['String']['output'];
};

export type SignInMutationVariables = Exact<{
  token?: InputMaybe<Scalars['String']['input']>;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn?: { __typename?: 'User', id: string, name: string, email: string, createdAt: Date | string, updatedAt: Date | string } | null };

export type FindPostQueryVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type FindPostQuery = { __typename?: 'Query', findFirstPost?: { __typename?: 'Post', id: string, published: boolean, title: string, content: string, authorId: string, cardId?: string | null, createdAt: Date | string, updatedAt: Date | string, publishedAt: Date | string, categories: Array<{ __typename?: 'Category', id: string, name: string, createdAt: Date | string, updatedAt: Date | string }> } | null };

export type FindPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindPostsQuery = { __typename?: 'Query', findManyPost: Array<{ __typename?: 'Post', id: string, published: boolean, title: string, authorId: string, cardId?: string | null, createdAt: Date | string, updatedAt: Date | string, publishedAt: Date | string, categories: Array<{ __typename?: 'Category', id: string, name: string, createdAt: Date | string, updatedAt: Date | string }> }> };

export type CreateOnePostMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateOnePostMutation = { __typename?: 'Mutation', createOnePost: { __typename?: 'Post', id: string, published: boolean, title: string, authorId: string, cardId?: string | null, createdAt: Date | string, updatedAt: Date | string, publishedAt: Date | string, categories: Array<{ __typename?: 'Category', id: string, name: string, createdAt: Date | string, updatedAt: Date | string }> } };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: Array<{ __typename?: 'Post_', id: string, published: boolean, title: string, authorId: string, cardId?: string | null, createdAt: Date | string, updatedAt: Date | string, publishedAt: Date | string }> };

export type UpdatePostMutationVariables = Exact<{
  postId: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  categories: Array<_CategoryToPostCreate> | _CategoryToPostCreate;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', normalizationPostFiles?: boolean | null, delete_CategoryToPost: Array<{ __typename?: '_CategoryToPost_', categoryId: string }>, createMany_CategoryToPost: Array<{ __typename?: '_CategoryToPost', categoryId: string }>, updatePost: Array<{ __typename?: 'Post', id: string, published: boolean, title: string, content: string, authorId: string, createdAt: Date | string, updatedAt: Date | string, publishedAt: Date | string, cardId?: string | null, categories: Array<{ __typename?: 'Category', id: string, name: string, createdAt: Date | string, updatedAt: Date | string }> }> };

export type UploadPostImageMutationVariables = Exact<{
  postId: Scalars['String']['input'];
  file: Scalars['Upload']['input'];
}>;


export type UploadPostImageMutation = { __typename?: 'Mutation', uploadPostImage: { __typename?: 'FireStore', id: string, createdAt: Date | string, updatedAt: Date | string, name: string, mimeType: string } };

export type FindSystemQueryVariables = Exact<{ [key: string]: never; }>;


export type FindSystemQuery = { __typename?: 'Query', findFirstSystem?: { __typename?: 'System', id: string, title: string, description: string, iconId?: string | null, cardId?: string | null, createdAt: Date | string, updatedAt: Date | string, icon?: { __typename?: 'FireStore', id: string, name: string, mimeType: string, createdAt: Date | string, updatedAt: Date | string } | null } | null };

export type CreateSystemMutationVariables = Exact<{
  input: SystemCreate;
}>;


export type CreateSystemMutation = { __typename?: 'Mutation', createOneSystem: { __typename?: 'System', id: string, title: string, description: string, iconId?: string | null, cardId?: string | null, createdAt: Date | string, updatedAt: Date | string } };

export type UpdateSystemMutationVariables = Exact<{
  title?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateSystemMutation = { __typename?: 'Mutation', updateSystem: Array<{ __typename?: 'System', id: string, title: string, description: string, iconId?: string | null, cardId?: string | null, createdAt: Date | string, updatedAt: Date | string, icon?: { __typename?: 'FireStore', id: string, name: string, mimeType: string, createdAt: Date | string, updatedAt: Date | string } | null }> };

export type FindCategoryQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type FindCategoryQuery = { __typename?: 'Query', findFirstCategory?: { __typename?: 'Category', id: string, name: string, createdAt: Date | string, updatedAt: Date | string } | null };

export type FindCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindCategoriesQuery = { __typename?: 'Query', findManyCategory: Array<{ __typename?: 'Category', id: string, name: string, createdAt: Date | string, updatedAt: Date | string }> };

export type CreateCategoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createOneCategory: { __typename?: 'Category', id: string, name: string, createdAt: Date | string, updatedAt: Date | string } };

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: Array<{ __typename?: 'Category', id: string, name: string, createdAt: Date | string, updatedAt: Date | string }> };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: Array<{ __typename?: 'Category_', id: string, name: string, createdAt: Date | string, updatedAt: Date | string }> };

export type UploadSystemIconMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
}>;


export type UploadSystemIconMutation = { __typename?: 'Mutation', uploadSystemIcon?: { __typename?: 'FireStore', id: string, name: string, mimeType: string, createdAt: Date | string, updatedAt: Date | string } | null };

export type UploadPostIconMutationVariables = Exact<{
  postId: Scalars['String']['input'];
  file?: InputMaybe<Scalars['Upload']['input']>;
}>;


export type UploadPostIconMutation = { __typename?: 'Mutation', uploadPostIcon?: { __typename?: 'FireStore', id: string, name: string, mimeType: string, createdAt: Date | string, updatedAt: Date | string } | null };

export type NormalizationPostFilesMutationVariables = Exact<{
  postId: Scalars['String']['input'];
  removeAll?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type NormalizationPostFilesMutation = { __typename?: 'Mutation', normalizationPostFiles?: boolean | null };

export type RestoreMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
}>;


export type RestoreMutation = { __typename?: 'Mutation', restore?: boolean | null };

export type BackupMutationVariables = Exact<{ [key: string]: never; }>;


export type BackupMutation = { __typename?: 'Mutation', backup: string };

export type UpdateCorsMutationVariables = Exact<{
  origin?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type UpdateCorsMutation = { __typename?: 'Mutation', bucket?: { __typename?: 'BucketObject', cors?: Array<{ __typename?: 'CorsObject', origin?: Array<string> | null, method?: Array<string> | null, responseHeader?: Array<string> | null, maxAgeSeconds?: number | null }> | null } | null };

export type BucketQueryVariables = Exact<{ [key: string]: never; }>;


export type BucketQuery = { __typename?: 'Query', bucket?: { __typename?: 'BucketObject', cors?: Array<{ __typename?: 'CorsObject', origin?: Array<string> | null, method?: Array<string> | null, responseHeader?: Array<string> | null, maxAgeSeconds?: number | null }> | null } | null };

export type RestoreFilesMutationVariables = Exact<{
  files: Array<Scalars['Upload']['input']> | Scalars['Upload']['input'];
}>;


export type RestoreFilesMutation = { __typename?: 'Mutation', restoreFiles?: Array<{ __typename?: 'FireStore', id: string, name: string, mimeType: string, createdAt: Date | string, updatedAt: Date | string }> | null };


export const SignInDocument = gql`
    mutation SignIn($token: String) {
  signIn(token: $token) {
    id
    name
    email
    createdAt
    updatedAt
  }
}
    `;

export function useSignInMutation() {
  return Urql.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument);
};
export const FindPostDocument = gql`
    query FindPost($postId: String!) {
  findFirstPost(where: {id: {eq: $postId}}) {
    id
    published
    title
    content
    authorId
    cardId
    createdAt
    updatedAt
    publishedAt
    categories {
      id
      name
      createdAt
      updatedAt
    }
  }
}
    `;

export function useFindPostQuery(options: Omit<Urql.UseQueryArgs<FindPostQueryVariables>, 'query'>) {
  return Urql.useQuery<FindPostQuery, FindPostQueryVariables>({ query: FindPostDocument, ...options });
};
export const FindPostsDocument = gql`
    query FindPosts {
  findManyPost(orderBy: {publishedAt: Desc}) {
    id
    published
    title
    authorId
    cardId
    createdAt
    updatedAt
    publishedAt
    categories {
      id
      name
      createdAt
      updatedAt
    }
  }
}
    `;

export function useFindPostsQuery(options?: Omit<Urql.UseQueryArgs<FindPostsQueryVariables>, 'query'>) {
  return Urql.useQuery<FindPostsQuery, FindPostsQueryVariables>({ query: FindPostsDocument, ...options });
};
export const CreateOnePostDocument = gql`
    mutation CreateOnePost {
  createOnePost(input: {authorId: "", content: "", published: false}) {
    id
    published
    title
    authorId
    cardId
    createdAt
    updatedAt
    publishedAt
    categories {
      id
      name
      createdAt
      updatedAt
    }
  }
}
    `;

export function useCreateOnePostMutation() {
  return Urql.useMutation<CreateOnePostMutation, CreateOnePostMutationVariables>(CreateOnePostDocument);
};
export const DeletePostDocument = gql`
    mutation DeletePost($id: String!) {
  deletePost(where: {id: {eq: $id}}) {
    id
    published
    title
    authorId
    cardId
    createdAt
    updatedAt
    publishedAt
  }
}
    `;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument);
};
export const UpdatePostDocument = gql`
    mutation UpdatePost($postId: String!, $title: String, $content: String, $published: Boolean, $publishedAt: DateTime, $categories: [_CategoryToPostCreate!]!) {
  delete_CategoryToPost(where: {postId: {eq: $postId}}) {
    categoryId
  }
  createMany_CategoryToPost(input: $categories) {
    categoryId
  }
  updatePost(
    input: {title: $title, content: $content, published: $published, publishedAt: $publishedAt}
    where: {id: {eq: $postId}}
  ) {
    id
    published
    title
    content
    authorId
    createdAt
    updatedAt
    publishedAt
    categories {
      id
      name
      createdAt
      updatedAt
    }
    cardId
  }
  normalizationPostFiles(postId: $postId)
}
    `;

export function useUpdatePostMutation() {
  return Urql.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument);
};
export const UploadPostImageDocument = gql`
    mutation UploadPostImage($postId: String!, $file: Upload!) {
  uploadPostImage(postId: $postId, file: $file) {
    id
    createdAt
    updatedAt
    name
    mimeType
  }
}
    `;

export function useUploadPostImageMutation() {
  return Urql.useMutation<UploadPostImageMutation, UploadPostImageMutationVariables>(UploadPostImageDocument);
};
export const FindSystemDocument = gql`
    query FindSystem {
  findFirstSystem(where: {id: {eq: "system"}}) {
    id
    title
    description
    iconId
    cardId
    createdAt
    updatedAt
    icon {
      id
      name
      mimeType
      createdAt
      updatedAt
    }
  }
}
    `;

export function useFindSystemQuery(options?: Omit<Urql.UseQueryArgs<FindSystemQueryVariables>, 'query'>) {
  return Urql.useQuery<FindSystemQuery, FindSystemQueryVariables>({ query: FindSystemDocument, ...options });
};
export const CreateSystemDocument = gql`
    mutation CreateSystem($input: SystemCreate!) {
  createOneSystem(input: $input) {
    id
    title
    description
    iconId
    cardId
    createdAt
    updatedAt
  }
}
    `;

export function useCreateSystemMutation() {
  return Urql.useMutation<CreateSystemMutation, CreateSystemMutationVariables>(CreateSystemDocument);
};
export const UpdateSystemDocument = gql`
    mutation UpdateSystem($title: String, $description: String, $icon: String) {
  updateSystem(
    input: {title: $title, description: $description, iconId: $icon}
    where: {id: {eq: "system"}}
  ) {
    id
    title
    description
    iconId
    cardId
    createdAt
    updatedAt
    icon {
      id
      name
      mimeType
      createdAt
      updatedAt
    }
  }
}
    `;

export function useUpdateSystemMutation() {
  return Urql.useMutation<UpdateSystemMutation, UpdateSystemMutationVariables>(UpdateSystemDocument);
};
export const FindCategoryDocument = gql`
    query FindCategory($id: String!) {
  findFirstCategory(where: {id: {eq: $id}}) {
    id
    name
    createdAt
    updatedAt
  }
}
    `;

export function useFindCategoryQuery(options: Omit<Urql.UseQueryArgs<FindCategoryQueryVariables>, 'query'>) {
  return Urql.useQuery<FindCategoryQuery, FindCategoryQueryVariables>({ query: FindCategoryDocument, ...options });
};
export const FindCategoriesDocument = gql`
    query FindCategories {
  findManyCategory {
    id
    name
    createdAt
    updatedAt
  }
}
    `;

export function useFindCategoriesQuery(options?: Omit<Urql.UseQueryArgs<FindCategoriesQueryVariables>, 'query'>) {
  return Urql.useQuery<FindCategoriesQuery, FindCategoriesQueryVariables>({ query: FindCategoriesDocument, ...options });
};
export const CreateCategoryDocument = gql`
    mutation CreateCategory($name: String!) {
  createOneCategory(input: {name: $name}) {
    id
    name
    createdAt
    updatedAt
  }
}
    `;

export function useCreateCategoryMutation() {
  return Urql.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument);
};
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($id: String!, $name: String!) {
  updateCategory(where: {id: {eq: $id}}, input: {name: $name}) {
    id
    name
    createdAt
    updatedAt
  }
}
    `;

export function useUpdateCategoryMutation() {
  return Urql.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument);
};
export const DeleteCategoryDocument = gql`
    mutation DeleteCategory($id: String!) {
  deleteCategory(where: {id: {eq: $id}}) {
    id
    name
    createdAt
    updatedAt
  }
}
    `;

export function useDeleteCategoryMutation() {
  return Urql.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument);
};
export const UploadSystemIconDocument = gql`
    mutation UploadSystemIcon($file: Upload!) {
  uploadSystemIcon(file: $file) {
    id
    name
    mimeType
    createdAt
    updatedAt
  }
}
    `;

export function useUploadSystemIconMutation() {
  return Urql.useMutation<UploadSystemIconMutation, UploadSystemIconMutationVariables>(UploadSystemIconDocument);
};
export const UploadPostIconDocument = gql`
    mutation UploadPostIcon($postId: String!, $file: Upload) {
  uploadPostIcon(postId: $postId, file: $file) {
    id
    name
    mimeType
    createdAt
    updatedAt
  }
}
    `;

export function useUploadPostIconMutation() {
  return Urql.useMutation<UploadPostIconMutation, UploadPostIconMutationVariables>(UploadPostIconDocument);
};
export const NormalizationPostFilesDocument = gql`
    mutation NormalizationPostFiles($postId: String!, $removeAll: Boolean) {
  normalizationPostFiles(postId: $postId, removeAll: $removeAll)
}
    `;

export function useNormalizationPostFilesMutation() {
  return Urql.useMutation<NormalizationPostFilesMutation, NormalizationPostFilesMutationVariables>(NormalizationPostFilesDocument);
};
export const RestoreDocument = gql`
    mutation Restore($file: Upload!) {
  restore(file: $file)
}
    `;

export function useRestoreMutation() {
  return Urql.useMutation<RestoreMutation, RestoreMutationVariables>(RestoreDocument);
};
export const BackupDocument = gql`
    mutation Backup {
  backup
}
    `;

export function useBackupMutation() {
  return Urql.useMutation<BackupMutation, BackupMutationVariables>(BackupDocument);
};
export const UpdateCorsDocument = gql`
    mutation UpdateCors($origin: [String!]) {
  bucket(cors: [{origin: $origin, method: ["GET"], maxAgeSeconds: 3600}]) {
    cors {
      origin
      method
      responseHeader
      maxAgeSeconds
    }
  }
}
    `;

export function useUpdateCorsMutation() {
  return Urql.useMutation<UpdateCorsMutation, UpdateCorsMutationVariables>(UpdateCorsDocument);
};
export const BucketDocument = gql`
    query Bucket {
  bucket {
    cors {
      origin
      method
      responseHeader
      maxAgeSeconds
    }
  }
}
    `;

export function useBucketQuery(options?: Omit<Urql.UseQueryArgs<BucketQueryVariables>, 'query'>) {
  return Urql.useQuery<BucketQuery, BucketQueryVariables>({ query: BucketDocument, ...options });
};
export const RestoreFilesDocument = gql`
    mutation RestoreFiles($files: [Upload!]!) {
  restoreFiles(files: $files) {
    id
    name
    mimeType
    createdAt
    updatedAt
  }
}
    `;

export function useRestoreFilesMutation() {
  return Urql.useMutation<RestoreFilesMutation, RestoreFilesMutationVariables>(RestoreFilesDocument);
};