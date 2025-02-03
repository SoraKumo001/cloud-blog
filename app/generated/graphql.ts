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
  BigInt: { input: any; output: any; }
  /** The `Byte` scalar type represents byte value as a Buffer */
  Bytes: { input: any; output: any; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: string; output: string; }
  /** A field whose value is a hexadecimal: https://en.wikipedia.org/wiki/Hexadecimal. */
  Decimal: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  Json: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<BooleanFilter>;
  notIn?: InputMaybe<Array<Scalars['Boolean']['input']>>;
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
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  posts: Array<Post>;
  postsCount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type CategoryPostsArgs = {
  filter?: InputMaybe<PostFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostOrderBy>>;
};


export type CategoryPostsCountArgs = {
  filter?: InputMaybe<PostFilter>;
};

export type CategoryCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CategoryFilter = {
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  posts?: InputMaybe<PostListFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CategoryListFilter = {
  every?: InputMaybe<CategoryFilter>;
  none?: InputMaybe<CategoryFilter>;
  some?: InputMaybe<CategoryFilter>;
};

export type CategoryOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  posts?: InputMaybe<PostOrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

export type CategoryUniqueFilter = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type CategoryUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  posts?: InputMaybe<CategoryUpdatePostsRelationInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CategoryUpdatePostsRelationInput = {
  connect?: InputMaybe<Array<PostUniqueFilter>>;
  create?: InputMaybe<Array<PostCreateInput>>;
  delete?: InputMaybe<Array<PostUniqueFilter>>;
  deleteMany?: InputMaybe<Array<PostWithoutCategoriesFilter>>;
  disconnect?: InputMaybe<Array<PostUniqueFilter>>;
  set?: InputMaybe<Array<PostUniqueFilter>>;
  update?: InputMaybe<Array<CategoryUpdatePostsRelationInputUpdate>>;
  updateMany?: InputMaybe<Array<CategoryUpdatePostsRelationInputUpdateMany>>;
};

export type CategoryUpdatePostsRelationInputUpdate = {
  data?: InputMaybe<PostUpdateWithoutAuthorWithoutCategoriesInput>;
  where?: InputMaybe<PostUniqueFilter>;
};

export type CategoryUpdatePostsRelationInputUpdateMany = {
  data?: InputMaybe<PostUpdateWithoutAuthorWithoutCategoriesInput>;
  where?: InputMaybe<PostWithoutCategoriesFilter>;
};

export type CategoryUpdateWithoutPostsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CategoryWithoutPostsFilter = {
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
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

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  is?: InputMaybe<Scalars['DateTime']['input']>;
  isNot?: InputMaybe<Scalars['DateTime']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type EncryptionObject = {
  __typename?: 'EncryptionObject';
  defaultKmsKeyName?: Maybe<Scalars['String']['output']>;
};

export type FireStore = {
  __typename?: 'FireStore';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
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
  filter?: InputMaybe<PostFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostOrderBy>>;
};


export type FireStorePostCardsCountArgs = {
  filter?: InputMaybe<PostFilter>;
};


export type FireStorePostsArgs = {
  filter?: InputMaybe<PostFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostOrderBy>>;
};


export type FireStorePostsCountArgs = {
  filter?: InputMaybe<PostFilter>;
};


export type FireStoreSystemCardsArgs = {
  filter?: InputMaybe<SystemFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SystemOrderBy>>;
};


export type FireStoreSystemCardsCountArgs = {
  filter?: InputMaybe<SystemFilter>;
};


export type FireStoreSystemIconsArgs = {
  filter?: InputMaybe<SystemFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SystemOrderBy>>;
};


export type FireStoreSystemIconsCountArgs = {
  filter?: InputMaybe<SystemFilter>;
};

export type FireStoreCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['String']['input'];
  mimeType: Scalars['String']['input'];
  name: Scalars['String']['input'];
  posts?: InputMaybe<FireStoreCreatePostsRelationInput>;
  systemCards?: InputMaybe<FireStoreCreateSystemCardsRelationInput>;
  systemIcons?: InputMaybe<FireStoreCreateSystemIconsRelationInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type FireStoreCreatePostsRelationInput = {
  connect?: InputMaybe<Array<PostUniqueFilter>>;
  create?: InputMaybe<Array<PostCreateInput>>;
};

export type FireStoreCreateSystemCardsRelationInput = {
  connect?: InputMaybe<Array<SystemUniqueFilter>>;
  create?: InputMaybe<Array<SystemCreateInput>>;
};

export type FireStoreCreateSystemIconsRelationInput = {
  connect?: InputMaybe<Array<SystemUniqueFilter>>;
  create?: InputMaybe<Array<SystemCreateInput>>;
};

export type FireStoreFilter = {
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  mimeType?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  postCards?: InputMaybe<PostListFilter>;
  posts?: InputMaybe<PostListFilter>;
  systemCards?: InputMaybe<SystemListFilter>;
  systemIcons?: InputMaybe<SystemListFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type FireStoreListFilter = {
  every?: InputMaybe<FireStoreFilter>;
  none?: InputMaybe<FireStoreFilter>;
  some?: InputMaybe<FireStoreFilter>;
};

export type FireStoreOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  mimeType?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  postCards?: InputMaybe<PostOrderBy>;
  posts?: InputMaybe<PostOrderBy>;
  systemCards?: InputMaybe<SystemOrderBy>;
  systemIcons?: InputMaybe<SystemOrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

export type FireStoreUniqueFilter = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type FireStoreUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  postCards?: InputMaybe<FireStoreUpdatePostCardsRelationInput>;
  posts?: InputMaybe<FireStoreUpdatePostsRelationInput>;
  systemCards?: InputMaybe<FireStoreUpdateSystemCardsRelationInput>;
  systemIcons?: InputMaybe<FireStoreUpdateSystemIconsRelationInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type FireStoreUpdatePostCardsRelationInput = {
  connect?: InputMaybe<Array<PostUniqueFilter>>;
  create?: InputMaybe<Array<PostCreateInput>>;
  delete?: InputMaybe<Array<PostUniqueFilter>>;
  deleteMany?: InputMaybe<Array<PostWithoutCardFilter>>;
  disconnect?: InputMaybe<Array<PostUniqueFilter>>;
  set?: InputMaybe<Array<PostUniqueFilter>>;
  update?: InputMaybe<Array<FireStoreUpdatePostCardsRelationInputUpdate>>;
  updateMany?: InputMaybe<Array<FireStoreUpdatePostCardsRelationInputUpdateMany>>;
};

export type FireStoreUpdatePostCardsRelationInputUpdate = {
  data?: InputMaybe<PostUpdateWithoutAuthorWithoutCardInput>;
  where?: InputMaybe<PostUniqueFilter>;
};

export type FireStoreUpdatePostCardsRelationInputUpdateMany = {
  data?: InputMaybe<PostUpdateWithoutAuthorWithoutCardInput>;
  where?: InputMaybe<PostWithoutCardFilter>;
};

export type FireStoreUpdatePostsRelationInput = {
  connect?: InputMaybe<Array<PostUniqueFilter>>;
  create?: InputMaybe<Array<PostCreateInput>>;
  delete?: InputMaybe<Array<PostUniqueFilter>>;
  deleteMany?: InputMaybe<Array<PostWithoutPostFilesFilter>>;
  disconnect?: InputMaybe<Array<PostUniqueFilter>>;
  set?: InputMaybe<Array<PostUniqueFilter>>;
  update?: InputMaybe<Array<FireStoreUpdatePostsRelationInputUpdate>>;
  updateMany?: InputMaybe<Array<FireStoreUpdatePostsRelationInputUpdateMany>>;
};

export type FireStoreUpdatePostsRelationInputUpdate = {
  data?: InputMaybe<PostUpdateWithoutAuthorWithoutPostFilesInput>;
  where?: InputMaybe<PostUniqueFilter>;
};

export type FireStoreUpdatePostsRelationInputUpdateMany = {
  data?: InputMaybe<PostUpdateWithoutAuthorWithoutPostFilesInput>;
  where?: InputMaybe<PostWithoutPostFilesFilter>;
};

export type FireStoreUpdateSystemCardsRelationInput = {
  connect?: InputMaybe<Array<SystemUniqueFilter>>;
  create?: InputMaybe<Array<SystemCreateInput>>;
  delete?: InputMaybe<Array<SystemUniqueFilter>>;
  deleteMany?: InputMaybe<Array<SystemWithoutCardFilter>>;
  disconnect?: InputMaybe<Array<SystemUniqueFilter>>;
  set?: InputMaybe<Array<SystemUniqueFilter>>;
  update?: InputMaybe<Array<FireStoreUpdateSystemCardsRelationInputUpdate>>;
  updateMany?: InputMaybe<Array<FireStoreUpdateSystemCardsRelationInputUpdateMany>>;
};

export type FireStoreUpdateSystemCardsRelationInputUpdate = {
  data?: InputMaybe<SystemUpdateWithoutCardInput>;
  where?: InputMaybe<SystemUniqueFilter>;
};

export type FireStoreUpdateSystemCardsRelationInputUpdateMany = {
  data?: InputMaybe<SystemUpdateWithoutCardInput>;
  where?: InputMaybe<SystemWithoutCardFilter>;
};

export type FireStoreUpdateSystemIconsRelationInput = {
  connect?: InputMaybe<Array<SystemUniqueFilter>>;
  create?: InputMaybe<Array<SystemCreateInput>>;
  delete?: InputMaybe<Array<SystemUniqueFilter>>;
  deleteMany?: InputMaybe<Array<SystemWithoutIconFilter>>;
  disconnect?: InputMaybe<Array<SystemUniqueFilter>>;
  set?: InputMaybe<Array<SystemUniqueFilter>>;
  update?: InputMaybe<Array<FireStoreUpdateSystemIconsRelationInputUpdate>>;
  updateMany?: InputMaybe<Array<FireStoreUpdateSystemIconsRelationInputUpdateMany>>;
};

export type FireStoreUpdateSystemIconsRelationInputUpdate = {
  data?: InputMaybe<SystemUpdateWithoutIconInput>;
  where?: InputMaybe<SystemUniqueFilter>;
};

export type FireStoreUpdateSystemIconsRelationInputUpdateMany = {
  data?: InputMaybe<SystemUpdateWithoutIconInput>;
  where?: InputMaybe<SystemWithoutIconFilter>;
};

export type FireStoreUpdateWithoutPostCardsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  posts?: InputMaybe<FireStoreUpdatePostsRelationInput>;
  systemCards?: InputMaybe<FireStoreUpdateSystemCardsRelationInput>;
  systemIcons?: InputMaybe<FireStoreUpdateSystemIconsRelationInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type FireStoreUpdateWithoutPostsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  postCards?: InputMaybe<FireStoreUpdatePostCardsRelationInput>;
  systemCards?: InputMaybe<FireStoreUpdateSystemCardsRelationInput>;
  systemIcons?: InputMaybe<FireStoreUpdateSystemIconsRelationInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type FireStoreUpdateWithoutSystemCardsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  postCards?: InputMaybe<FireStoreUpdatePostCardsRelationInput>;
  posts?: InputMaybe<FireStoreUpdatePostsRelationInput>;
  systemIcons?: InputMaybe<FireStoreUpdateSystemIconsRelationInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type FireStoreUpdateWithoutSystemIconsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  postCards?: InputMaybe<FireStoreUpdatePostCardsRelationInput>;
  posts?: InputMaybe<FireStoreUpdatePostsRelationInput>;
  systemCards?: InputMaybe<FireStoreUpdateSystemCardsRelationInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type FireStoreWithoutPostsFilter = {
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  mimeType?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  postCards?: InputMaybe<PostListFilter>;
  systemCards?: InputMaybe<SystemListFilter>;
  systemIcons?: InputMaybe<SystemListFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type Mutation = {
  __typename?: 'Mutation';
  backup: Scalars['String']['output'];
  bucket?: Maybe<BucketObject>;
  createManyCategory: Scalars['Int']['output'];
  createManyFireStore: Scalars['Int']['output'];
  createManyPost: Scalars['Int']['output'];
  createManySystem: Scalars['Int']['output'];
  createManyUser: Scalars['Int']['output'];
  createOneCategory: Category;
  createOneFireStore: FireStore;
  createOnePost: Post;
  createOneSystem: System;
  createOneUser: User;
  deleteManyCategory: Scalars['Int']['output'];
  deleteManyFireStore: Scalars['Int']['output'];
  deleteManyPost: Scalars['Int']['output'];
  deleteManySystem: Scalars['Int']['output'];
  deleteManyUser: Scalars['Int']['output'];
  deleteOneCategory: Category;
  deleteOneFireStore: FireStore;
  deleteOnePost: Post;
  deleteOneSystem: System;
  deleteOneUser: User;
  normalizationPostFiles?: Maybe<Scalars['Boolean']['output']>;
  restore?: Maybe<Scalars['Boolean']['output']>;
  restoreFiles?: Maybe<Array<FireStore>>;
  signIn?: Maybe<User>;
  updateManyCategory: Scalars['Int']['output'];
  updateManyFireStore: Scalars['Int']['output'];
  updateManyPost: Scalars['Int']['output'];
  updateManySystem: Scalars['Int']['output'];
  updateManyUser: Scalars['Int']['output'];
  updateOneCategory: Category;
  updateOneFireStore: FireStore;
  updateOnePost: Post;
  updateOneSystem: System;
  updateOneUser: User;
  uploadPostIcon?: Maybe<FireStore>;
  uploadPostImage: FireStore;
  uploadSystemIcon?: Maybe<FireStore>;
};


export type MutationBucketArgs = {
  cors?: InputMaybe<Array<CorsInput>>;
};


export type MutationCreateManyCategoryArgs = {
  input: Array<CategoryCreateInput>;
};


export type MutationCreateManyFireStoreArgs = {
  input: Array<FireStoreCreateInput>;
};


export type MutationCreateManyPostArgs = {
  input: Array<PostCreateInput>;
};


export type MutationCreateManySystemArgs = {
  input: Array<SystemCreateInput>;
};


export type MutationCreateManyUserArgs = {
  input: Array<UserCreateInput>;
};


export type MutationCreateOneCategoryArgs = {
  input: CategoryCreateInput;
};


export type MutationCreateOneFireStoreArgs = {
  input: FireStoreCreateInput;
};


export type MutationCreateOnePostArgs = {
  input: PostCreateInput;
};


export type MutationCreateOneSystemArgs = {
  input: SystemCreateInput;
};


export type MutationCreateOneUserArgs = {
  input: UserCreateInput;
};


export type MutationDeleteManyCategoryArgs = {
  where: CategoryFilter;
};


export type MutationDeleteManyFireStoreArgs = {
  where: FireStoreFilter;
};


export type MutationDeleteManyPostArgs = {
  where: PostFilter;
};


export type MutationDeleteManySystemArgs = {
  where: SystemFilter;
};


export type MutationDeleteManyUserArgs = {
  where: UserFilter;
};


export type MutationDeleteOneCategoryArgs = {
  where: CategoryUniqueFilter;
};


export type MutationDeleteOneFireStoreArgs = {
  where: FireStoreUniqueFilter;
};


export type MutationDeleteOnePostArgs = {
  where: PostUniqueFilter;
};


export type MutationDeleteOneSystemArgs = {
  where: SystemUniqueFilter;
};


export type MutationDeleteOneUserArgs = {
  where: UserUniqueFilter;
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


export type MutationUpdateManyCategoryArgs = {
  data: CategoryUpdateInput;
  where: CategoryFilter;
};


export type MutationUpdateManyFireStoreArgs = {
  data: FireStoreUpdateInput;
  where: FireStoreFilter;
};


export type MutationUpdateManyPostArgs = {
  data: PostUpdateWithoutAuthorWithoutAuthorInput;
  where: PostFilter;
};


export type MutationUpdateManySystemArgs = {
  data: SystemUpdateInput;
  where: SystemFilter;
};


export type MutationUpdateManyUserArgs = {
  data: UserUpdateInput;
  where: UserFilter;
};


export type MutationUpdateOneCategoryArgs = {
  data: CategoryUpdateInput;
  where: CategoryUniqueFilter;
};


export type MutationUpdateOneFireStoreArgs = {
  data: FireStoreUpdateInput;
  where: FireStoreUniqueFilter;
};


export type MutationUpdateOnePostArgs = {
  data: PostUpdateWithoutAuthorInput;
  where: PostUniqueFilter;
};


export type MutationUpdateOneSystemArgs = {
  data: SystemUpdateInput;
  where: SystemUniqueFilter;
};


export type MutationUpdateOneUserArgs = {
  data: UserUpdateInput;
  where: UserUniqueFilter;
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
  author: User;
  authorId: Scalars['String']['output'];
  card?: Maybe<FireStore>;
  cardId?: Maybe<Scalars['String']['output']>;
  categories: Array<Category>;
  categoriesCount: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  postFiles: Array<FireStore>;
  postFilesCount: Scalars['Int']['output'];
  published: Scalars['Boolean']['output'];
  publishedAt: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type PostCategoriesArgs = {
  filter?: InputMaybe<CategoryFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CategoryOrderBy>>;
};


export type PostCategoriesCountArgs = {
  filter?: InputMaybe<CategoryFilter>;
};


export type PostPostFilesArgs = {
  filter?: InputMaybe<FireStoreFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FireStoreOrderBy>>;
};


export type PostPostFilesCountArgs = {
  filter?: InputMaybe<FireStoreFilter>;
};

export type PostCreateCardRelationInput = {
  connect?: InputMaybe<FireStoreUniqueFilter>;
  create?: InputMaybe<FireStoreCreateInput>;
};

export type PostCreateCategoriesRelationInput = {
  connect?: InputMaybe<Array<CategoryUniqueFilter>>;
  create?: InputMaybe<Array<CategoryCreateInput>>;
};

export type PostCreateInput = {
  card?: InputMaybe<PostCreateCardRelationInput>;
  categories?: InputMaybe<PostCreateCategoriesRelationInput>;
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  postFiles?: InputMaybe<PostCreatePostFilesRelationInput>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PostCreatePostFilesRelationInput = {
  connect?: InputMaybe<Array<FireStoreUniqueFilter>>;
  create?: InputMaybe<Array<FireStoreCreateInput>>;
};

export type PostFilter = {
  author?: InputMaybe<UserFilter>;
  authorId?: InputMaybe<StringFilter>;
  card?: InputMaybe<FireStoreFilter>;
  cardId?: InputMaybe<StringFilter>;
  categories?: InputMaybe<CategoryListFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  postFiles?: InputMaybe<FireStoreListFilter>;
  published?: InputMaybe<BooleanFilter>;
  publishedAt?: InputMaybe<DateTimeFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type PostListFilter = {
  every?: InputMaybe<PostFilter>;
  none?: InputMaybe<PostFilter>;
  some?: InputMaybe<PostFilter>;
};

export type PostOrderBy = {
  author?: InputMaybe<UserOrderBy>;
  authorId?: InputMaybe<OrderBy>;
  card?: InputMaybe<FireStoreOrderBy>;
  cardId?: InputMaybe<OrderBy>;
  categories?: InputMaybe<CategoryOrderBy>;
  content?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  postFiles?: InputMaybe<FireStoreOrderBy>;
  published?: InputMaybe<OrderBy>;
  publishedAt?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

export type PostUniqueFilter = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type PostUpdateCardRelationInput = {
  connect?: InputMaybe<FireStoreUniqueFilter>;
  create?: InputMaybe<FireStoreCreateInput>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<FireStoreUpdateWithoutPostCardsInput>;
};

export type PostUpdateCategoriesRelationInput = {
  connect?: InputMaybe<Array<CategoryUniqueFilter>>;
  create?: InputMaybe<Array<CategoryCreateInput>>;
  delete?: InputMaybe<Array<CategoryUniqueFilter>>;
  deleteMany?: InputMaybe<Array<CategoryWithoutPostsFilter>>;
  disconnect?: InputMaybe<Array<CategoryUniqueFilter>>;
  set?: InputMaybe<Array<CategoryUniqueFilter>>;
  update?: InputMaybe<Array<PostUpdateCategoriesRelationInputUpdate>>;
  updateMany?: InputMaybe<Array<PostUpdateCategoriesRelationInputUpdateMany>>;
};

export type PostUpdateCategoriesRelationInputUpdate = {
  data?: InputMaybe<CategoryUpdateWithoutPostsInput>;
  where?: InputMaybe<CategoryUniqueFilter>;
};

export type PostUpdateCategoriesRelationInputUpdateMany = {
  data?: InputMaybe<CategoryUpdateWithoutPostsInput>;
  where?: InputMaybe<CategoryWithoutPostsFilter>;
};

export type PostUpdatePostFilesRelationInput = {
  connect?: InputMaybe<Array<FireStoreUniqueFilter>>;
  create?: InputMaybe<Array<FireStoreCreateInput>>;
  delete?: InputMaybe<Array<FireStoreUniqueFilter>>;
  deleteMany?: InputMaybe<Array<FireStoreWithoutPostsFilter>>;
  disconnect?: InputMaybe<Array<FireStoreUniqueFilter>>;
  set?: InputMaybe<Array<FireStoreUniqueFilter>>;
  update?: InputMaybe<Array<PostUpdatePostFilesRelationInputUpdate>>;
  updateMany?: InputMaybe<Array<PostUpdatePostFilesRelationInputUpdateMany>>;
};

export type PostUpdatePostFilesRelationInputUpdate = {
  data?: InputMaybe<FireStoreUpdateWithoutPostsInput>;
  where?: InputMaybe<FireStoreUniqueFilter>;
};

export type PostUpdatePostFilesRelationInputUpdateMany = {
  data?: InputMaybe<FireStoreUpdateWithoutPostsInput>;
  where?: InputMaybe<FireStoreWithoutPostsFilter>;
};

export type PostUpdateWithoutAuthorInput = {
  card?: InputMaybe<PostUpdateCardRelationInput>;
  categories?: InputMaybe<PostUpdateCategoriesRelationInput>;
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  postFiles?: InputMaybe<PostUpdatePostFilesRelationInput>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PostUpdateWithoutAuthorWithoutAuthorInput = {
  card?: InputMaybe<PostUpdateCardRelationInput>;
  categories?: InputMaybe<PostUpdateCategoriesRelationInput>;
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  postFiles?: InputMaybe<PostUpdatePostFilesRelationInput>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PostUpdateWithoutAuthorWithoutCardInput = {
  categories?: InputMaybe<PostUpdateCategoriesRelationInput>;
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  postFiles?: InputMaybe<PostUpdatePostFilesRelationInput>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PostUpdateWithoutAuthorWithoutCategoriesInput = {
  card?: InputMaybe<PostUpdateCardRelationInput>;
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  postFiles?: InputMaybe<PostUpdatePostFilesRelationInput>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PostUpdateWithoutAuthorWithoutPostFilesInput = {
  card?: InputMaybe<PostUpdateCardRelationInput>;
  categories?: InputMaybe<PostUpdateCategoriesRelationInput>;
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type PostWithoutAuthorFilter = {
  card?: InputMaybe<FireStoreFilter>;
  cardId?: InputMaybe<StringFilter>;
  categories?: InputMaybe<CategoryListFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  postFiles?: InputMaybe<FireStoreListFilter>;
  published?: InputMaybe<BooleanFilter>;
  publishedAt?: InputMaybe<DateTimeFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type PostWithoutCardFilter = {
  author?: InputMaybe<UserFilter>;
  authorId?: InputMaybe<StringFilter>;
  categories?: InputMaybe<CategoryListFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  postFiles?: InputMaybe<FireStoreListFilter>;
  published?: InputMaybe<BooleanFilter>;
  publishedAt?: InputMaybe<DateTimeFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type PostWithoutCategoriesFilter = {
  author?: InputMaybe<UserFilter>;
  authorId?: InputMaybe<StringFilter>;
  card?: InputMaybe<FireStoreFilter>;
  cardId?: InputMaybe<StringFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  postFiles?: InputMaybe<FireStoreListFilter>;
  published?: InputMaybe<BooleanFilter>;
  publishedAt?: InputMaybe<DateTimeFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type PostWithoutPostFilesFilter = {
  author?: InputMaybe<UserFilter>;
  authorId?: InputMaybe<StringFilter>;
  card?: InputMaybe<FireStoreFilter>;
  cardId?: InputMaybe<StringFilter>;
  categories?: InputMaybe<CategoryListFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  published?: InputMaybe<BooleanFilter>;
  publishedAt?: InputMaybe<DateTimeFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type Query = {
  __typename?: 'Query';
  bucket?: Maybe<BucketObject>;
  countCategory: Scalars['Int']['output'];
  countFireStore: Scalars['Int']['output'];
  countPost: Scalars['Int']['output'];
  countSystem: Scalars['Int']['output'];
  countUser: Scalars['Int']['output'];
  findFirstCategory?: Maybe<Category>;
  findFirstFireStore?: Maybe<FireStore>;
  findFirstPost?: Maybe<Post>;
  findFirstSystem?: Maybe<System>;
  findFirstUser?: Maybe<User>;
  findManyCategory: Array<Category>;
  findManyFireStore: Array<FireStore>;
  findManyPost: Array<Post>;
  findManySystem: Array<System>;
  findManyUser: Array<User>;
  findUniqueCategory: Category;
  findUniqueFireStore: FireStore;
  findUniquePost: Post;
  findUniqueSystem: System;
  findUniqueUser: User;
};


export type QueryCountCategoryArgs = {
  filter?: InputMaybe<CategoryFilter>;
};


export type QueryCountFireStoreArgs = {
  filter?: InputMaybe<FireStoreFilter>;
};


export type QueryCountPostArgs = {
  filter?: InputMaybe<PostFilter>;
};


export type QueryCountSystemArgs = {
  filter?: InputMaybe<SystemFilter>;
};


export type QueryCountUserArgs = {
  filter?: InputMaybe<UserFilter>;
};


export type QueryFindFirstCategoryArgs = {
  filter?: InputMaybe<CategoryFilter>;
  orderBy?: InputMaybe<Array<CategoryOrderBy>>;
};


export type QueryFindFirstFireStoreArgs = {
  filter?: InputMaybe<FireStoreFilter>;
  orderBy?: InputMaybe<Array<FireStoreOrderBy>>;
};


export type QueryFindFirstPostArgs = {
  filter?: InputMaybe<PostFilter>;
  orderBy?: InputMaybe<Array<PostOrderBy>>;
};


export type QueryFindFirstSystemArgs = {
  filter?: InputMaybe<SystemFilter>;
  orderBy?: InputMaybe<Array<SystemOrderBy>>;
};


export type QueryFindFirstUserArgs = {
  filter?: InputMaybe<UserFilter>;
  orderBy?: InputMaybe<Array<UserOrderBy>>;
};


export type QueryFindManyCategoryArgs = {
  filter?: InputMaybe<CategoryFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CategoryOrderBy>>;
};


export type QueryFindManyFireStoreArgs = {
  filter?: InputMaybe<FireStoreFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FireStoreOrderBy>>;
};


export type QueryFindManyPostArgs = {
  filter?: InputMaybe<PostFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostOrderBy>>;
};


export type QueryFindManySystemArgs = {
  filter?: InputMaybe<SystemFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SystemOrderBy>>;
};


export type QueryFindManyUserArgs = {
  filter?: InputMaybe<UserFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserOrderBy>>;
};


export type QueryFindUniqueCategoryArgs = {
  filter: CategoryUniqueFilter;
};


export type QueryFindUniqueFireStoreArgs = {
  filter: FireStoreUniqueFilter;
};


export type QueryFindUniquePostArgs = {
  filter: PostUniqueFilter;
};


export type QueryFindUniqueSystemArgs = {
  filter: SystemUniqueFilter;
};


export type QueryFindUniqueUserArgs = {
  filter: UserUniqueFilter;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  is?: InputMaybe<Scalars['String']['input']>;
  isNot?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<StringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type System = {
  __typename?: 'System';
  card?: Maybe<FireStore>;
  cardId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  icon?: Maybe<FireStore>;
  iconId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SystemCreateCardRelationInput = {
  connect?: InputMaybe<FireStoreUniqueFilter>;
  create?: InputMaybe<FireStoreCreateInput>;
};

export type SystemCreateInput = {
  card?: InputMaybe<SystemCreateCardRelationInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description: Scalars['String']['input'];
  id: Scalars['String']['input'];
  title: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SystemFilter = {
  card?: InputMaybe<FireStoreFilter>;
  cardId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  icon?: InputMaybe<FireStoreFilter>;
  iconId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type SystemListFilter = {
  every?: InputMaybe<SystemFilter>;
  none?: InputMaybe<SystemFilter>;
  some?: InputMaybe<SystemFilter>;
};

export type SystemOrderBy = {
  card?: InputMaybe<FireStoreOrderBy>;
  cardId?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  description?: InputMaybe<OrderBy>;
  icon?: InputMaybe<FireStoreOrderBy>;
  iconId?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

export type SystemUniqueFilter = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type SystemUpdateCardRelationInput = {
  connect?: InputMaybe<FireStoreUniqueFilter>;
  create?: InputMaybe<FireStoreCreateInput>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<FireStoreUpdateWithoutSystemCardsInput>;
};

export type SystemUpdateIconRelationInput = {
  connect?: InputMaybe<FireStoreUniqueFilter>;
  create?: InputMaybe<FireStoreCreateInput>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<FireStoreUpdateWithoutSystemIconsInput>;
};

export type SystemUpdateInput = {
  card?: InputMaybe<SystemUpdateCardRelationInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<SystemUpdateIconRelationInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SystemUpdateWithoutCardInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<SystemUpdateIconRelationInput>;
  id?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SystemUpdateWithoutIconInput = {
  card?: InputMaybe<SystemUpdateCardRelationInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SystemWithoutCardFilter = {
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  icon?: InputMaybe<FireStoreFilter>;
  iconId?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type SystemWithoutIconFilter = {
  card?: InputMaybe<FireStoreFilter>;
  cardId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  post: Array<Post>;
  postCount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type UserPostArgs = {
  filter?: InputMaybe<PostFilter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PostOrderBy>>;
};


export type UserPostCountArgs = {
  filter?: InputMaybe<PostFilter>;
};

export type UserCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  post?: InputMaybe<UserCreatePostRelationInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserCreatePostRelationInput = {
  connect?: InputMaybe<Array<PostUniqueFilter>>;
  create?: InputMaybe<Array<PostCreateInput>>;
};

export type UserFilter = {
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  post?: InputMaybe<PostListFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type UserOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  email?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  post?: InputMaybe<PostOrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

export type UserUniqueFilter = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

export type UserUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  post?: InputMaybe<UserUpdatePostRelationInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserUpdatePostRelationInput = {
  connect?: InputMaybe<Array<PostUniqueFilter>>;
  create?: InputMaybe<Array<PostCreateInput>>;
  delete?: InputMaybe<Array<PostUniqueFilter>>;
  deleteMany?: InputMaybe<Array<PostWithoutAuthorFilter>>;
  disconnect?: InputMaybe<Array<PostUniqueFilter>>;
  set?: InputMaybe<Array<PostUniqueFilter>>;
  update?: InputMaybe<Array<UserUpdatePostRelationInputUpdate>>;
  updateMany?: InputMaybe<Array<UserUpdatePostRelationInputUpdateMany>>;
};

export type UserUpdatePostRelationInputUpdate = {
  data?: InputMaybe<PostUpdateWithoutAuthorWithoutAuthorInput>;
  where?: InputMaybe<PostUniqueFilter>;
};

export type UserUpdatePostRelationInputUpdateMany = {
  data?: InputMaybe<PostUpdateWithoutAuthorWithoutAuthorInput>;
  where?: InputMaybe<PostWithoutAuthorFilter>;
};

export type SignInMutationVariables = Exact<{
  token?: InputMaybe<Scalars['String']['input']>;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn?: { __typename?: 'User', id: string, name: string, email: string, createdAt: string, updatedAt: string } | null };

export type PostQueryVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type PostQuery = { __typename?: 'Query', findUniquePost: { __typename?: 'Post', id: string, published: boolean, title: string, content: string, authorId: string, cardId?: string | null, createdAt: string, updatedAt: string, publishedAt: string, categories: Array<{ __typename?: 'Category', id: string, name: string, createdAt: string, updatedAt: string }> } };

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', findManyPost: Array<{ __typename?: 'Post', id: string, published: boolean, title: string, authorId: string, cardId?: string | null, createdAt: string, updatedAt: string, publishedAt: string, categories: Array<{ __typename?: 'Category', id: string, name: string, createdAt: string, updatedAt: string }> }> };

export type CreateOnePostMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateOnePostMutation = { __typename?: 'Mutation', createOnePost: { __typename?: 'Post', id: string, published: boolean, title: string, authorId: string, cardId?: string | null, createdAt: string, updatedAt: string, publishedAt: string, categories: Array<{ __typename?: 'Category', id: string, name: string, createdAt: string, updatedAt: string }> } };

export type DeleteOnePostMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteOnePostMutation = { __typename?: 'Mutation', deleteOnePost: { __typename?: 'Post', id: string, published: boolean, title: string, authorId: string, cardId?: string | null, createdAt: string, updatedAt: string, publishedAt: string, categories: Array<{ __typename?: 'Category', id: string, name: string, createdAt: string, updatedAt: string }> } };

export type UpdateOnePostMutationVariables = Exact<{
  categories?: InputMaybe<Array<CategoryUniqueFilter> | CategoryUniqueFilter>;
  where: PostUniqueFilter;
}>;


export type UpdateOnePostMutation = { __typename?: 'Mutation', updateOnePost: { __typename?: 'Post', id: string } };

export type UpdatePostMutationVariables = Exact<{
  postId: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  published?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  categories?: InputMaybe<Array<CategoryUniqueFilter> | CategoryUniqueFilter>;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', normalizationPostFiles?: boolean | null, updateOnePost: { __typename?: 'Post', id: string, published: boolean, title: string, content: string, authorId: string, createdAt: string, updatedAt: string, publishedAt: string, cardId?: string | null, categories: Array<{ __typename?: 'Category', id: string, name: string, createdAt: string, updatedAt: string }> } };

export type UploadPostImageMutationVariables = Exact<{
  postId: Scalars['String']['input'];
  file: Scalars['Upload']['input'];
}>;


export type UploadPostImageMutation = { __typename?: 'Mutation', uploadPostImage: { __typename?: 'FireStore', id: string, createdAt: string, updatedAt: string, name: string, mimeType: string } };

export type SystemQueryVariables = Exact<{ [key: string]: never; }>;


export type SystemQuery = { __typename?: 'Query', findUniqueSystem: { __typename?: 'System', id: string, title: string, description: string, iconId?: string | null, cardId?: string | null, createdAt: string, updatedAt: string, icon?: { __typename?: 'FireStore', id: string, name: string, mimeType: string, createdAt: string, updatedAt: string } | null } };

export type CreateSystemMutationVariables = Exact<{
  input: SystemCreateInput;
}>;


export type CreateSystemMutation = { __typename?: 'Mutation', createOneSystem: { __typename?: 'System', id: string, title: string, description: string, iconId?: string | null, cardId?: string | null, createdAt: string, updatedAt: string } };

export type UpdateSystemMutationVariables = Exact<{
  title?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<SystemUpdateIconRelationInput>;
}>;


export type UpdateSystemMutation = { __typename?: 'Mutation', updateOneSystem: { __typename?: 'System', id: string, title: string, description: string, iconId?: string | null, cardId?: string | null, createdAt: string, updatedAt: string, icon?: { __typename?: 'FireStore', id: string, name: string, mimeType: string, createdAt: string, updatedAt: string } | null } };

export type CategoryQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type CategoryQuery = { __typename?: 'Query', findUniqueCategory: { __typename?: 'Category', id: string, name: string, createdAt: string, updatedAt: string } };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', findManyCategory: Array<{ __typename?: 'Category', id: string, name: string, createdAt: string, updatedAt: string }> };

export type CreateCategoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createOneCategory: { __typename?: 'Category', id: string, name: string, createdAt: string, updatedAt: string } };

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateOneCategory: { __typename?: 'Category', id: string, name: string, createdAt: string, updatedAt: string } };

export type DeleteOneCategoryMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteOneCategoryMutation = { __typename?: 'Mutation', deleteOneCategory: { __typename?: 'Category', id: string, name: string, createdAt: string, updatedAt: string } };

export type UploadSystemIconMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
}>;


export type UploadSystemIconMutation = { __typename?: 'Mutation', uploadSystemIcon?: { __typename?: 'FireStore', id: string, name: string, mimeType: string, createdAt: string, updatedAt: string } | null };

export type UploadPostIconMutationVariables = Exact<{
  postId: Scalars['String']['input'];
  file?: InputMaybe<Scalars['Upload']['input']>;
}>;


export type UploadPostIconMutation = { __typename?: 'Mutation', uploadPostIcon?: { __typename?: 'FireStore', id: string, name: string, mimeType: string, createdAt: string, updatedAt: string } | null };

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


export type RestoreFilesMutation = { __typename?: 'Mutation', restoreFiles?: Array<{ __typename?: 'FireStore', id: string, name: string, mimeType: string, createdAt: string, updatedAt: string }> | null };


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
export const PostDocument = gql`
    query Post($postId: String!) {
  findUniquePost(filter: {id: $postId}) {
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

export function usePostQuery(options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'>) {
  return Urql.useQuery<PostQuery, PostQueryVariables>({ query: PostDocument, ...options });
};
export const PostsDocument = gql`
    query Posts {
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

export function usePostsQuery(options?: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'>) {
  return Urql.useQuery<PostsQuery, PostsQueryVariables>({ query: PostsDocument, ...options });
};
export const CreateOnePostDocument = gql`
    mutation CreateOnePost {
  createOnePost(input: {}) {
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
export const DeleteOnePostDocument = gql`
    mutation DeleteOnePost($id: String!) {
  deleteOnePost(where: {id: $id}) {
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

export function useDeleteOnePostMutation() {
  return Urql.useMutation<DeleteOnePostMutation, DeleteOnePostMutationVariables>(DeleteOnePostDocument);
};
export const UpdateOnePostDocument = gql`
    mutation UpdateOnePost($categories: [CategoryUniqueFilter!], $where: PostUniqueFilter!) {
  updateOnePost(data: {categories: {set: $categories}}, where: $where) {
    id
  }
}
    `;

export function useUpdateOnePostMutation() {
  return Urql.useMutation<UpdateOnePostMutation, UpdateOnePostMutationVariables>(UpdateOnePostDocument);
};
export const UpdatePostDocument = gql`
    mutation UpdatePost($postId: String!, $title: String, $content: String, $published: Boolean, $publishedAt: DateTime, $categories: [CategoryUniqueFilter!]) {
  updateOnePost(
    data: {id: $postId, title: $title, content: $content, published: $published, publishedAt: $publishedAt, categories: {set: $categories}}
    where: {id: $postId}
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
export const SystemDocument = gql`
    query System {
  findUniqueSystem(filter: {id: "system"}) {
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

export function useSystemQuery(options?: Omit<Urql.UseQueryArgs<SystemQueryVariables>, 'query'>) {
  return Urql.useQuery<SystemQuery, SystemQueryVariables>({ query: SystemDocument, ...options });
};
export const CreateSystemDocument = gql`
    mutation createSystem($input: SystemCreateInput!) {
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
    mutation UpdateSystem($title: String, $description: String, $icon: SystemUpdateIconRelationInput) {
  updateOneSystem(
    data: {title: $title, description: $description, icon: $icon}
    where: {id: "system"}
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
export const CategoryDocument = gql`
    query Category($id: String!) {
  findUniqueCategory(filter: {id: $id}) {
    id
    name
    createdAt
    updatedAt
  }
}
    `;

export function useCategoryQuery(options: Omit<Urql.UseQueryArgs<CategoryQueryVariables>, 'query'>) {
  return Urql.useQuery<CategoryQuery, CategoryQueryVariables>({ query: CategoryDocument, ...options });
};
export const CategoriesDocument = gql`
    query Categories {
  findManyCategory {
    id
    name
    createdAt
    updatedAt
  }
}
    `;

export function useCategoriesQuery(options?: Omit<Urql.UseQueryArgs<CategoriesQueryVariables>, 'query'>) {
  return Urql.useQuery<CategoriesQuery, CategoriesQueryVariables>({ query: CategoriesDocument, ...options });
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
  updateOneCategory(where: {id: $id}, data: {name: $name}) {
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
export const DeleteOneCategoryDocument = gql`
    mutation DeleteOneCategory($id: String!) {
  deleteOneCategory(where: {id: $id}) {
    id
    name
    createdAt
    updatedAt
  }
}
    `;

export function useDeleteOneCategoryMutation() {
  return Urql.useMutation<DeleteOneCategoryMutation, DeleteOneCategoryMutationVariables>(DeleteOneCategoryDocument);
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