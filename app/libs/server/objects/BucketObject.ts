import {
  type ObjectFieldBuilder,
  ObjectRef,
  type SchemaTypes,
} from "@pothos/core";
import type { BuilderType } from "../builder";
import type { BucketObject } from "firebase-storage";

export const EncryptionObjectType = new ObjectRef<
  PothosSchemaTypes.ExtendDefaultTypes<BuilderType>,
  BucketObject["encryption"]
>("EncryptionObject");
export const CorsObjectType = new ObjectRef<
  PothosSchemaTypes.ExtendDefaultTypes<BuilderType>,
  BucketObject["cors"][0]
>("CorsObject");
export const BucketObjectType = new ObjectRef<
  PothosSchemaTypes.ExtendDefaultTypes<BuilderType>,
  BucketObject
>("BucketObject");

export const createBucketObject = (
  builder: PothosSchemaTypes.SchemaBuilder<
    PothosSchemaTypes.ExtendDefaultTypes<BuilderType>
  >
) => {
  builder.objectType(EncryptionObjectType, {
    fields: (
      t: ObjectFieldBuilder<
        PothosSchemaTypes.ExtendDefaultTypes<BuilderType>,
        BucketObject["encryption"]
      >
    ) => ({
      defaultKmsKeyName: t.string({
        resolve: (parent) => parent.defaultKmsKeyName,
      }),
    }),
  });

  builder.objectType(CorsObjectType, {
    fields: (
      t: ObjectFieldBuilder<
        PothosSchemaTypes.ExtendDefaultTypes<BuilderType>,
        BucketObject["cors"][number]
      >
    ) => ({
      origin: t.stringList({
        resolve: (parent) => parent.origin,
        nullable: true,
      }),
      method: t.stringList({
        resolve: (parent) => parent.method,
        nullable: true,
      }),
      responseHeader: t.stringList({
        resolve: (parent) => parent.responseHeader,
        nullable: true,
      }),
      maxAgeSeconds: t.int({
        resolve: (parent) => parent.maxAgeSeconds,
        nullable: true,
      }),
    }),
  });

  builder.objectType(BucketObjectType, {
    fields: (
      t: ObjectFieldBuilder<
        PothosSchemaTypes.ExtendDefaultTypes<BuilderType>,
        BucketObject
      >
    ) =>
      ({
        kind: t.string({ resolve: (parent) => parent.kind }),
        id: t.string({ resolve: (parent) => parent.id }),
        selfLink: t.string({ resolve: (parent) => parent.selfLink }),
        name: t.string({ resolve: (parent) => parent.name }),
        projectNumber: t.string({ resolve: (parent) => parent.projectNumber }),
        metageneration: t.string({
          resolve: (parent) => parent.metageneration,
        }),
        location: t.string({ resolve: (parent) => parent.location }),
        storageClass: t.string({ resolve: (parent) => parent.storageClass }),
        etag: t.string({ resolve: (parent) => parent.etag }),
        defaultEventBasedHold: t.boolean({
          nullable: true,
          resolve: (parent) => parent.defaultEventBasedHold,
        }),
        timeCreated: t.string({ resolve: (parent) => parent.timeCreated }),
        updated: t.string({ resolve: (parent) => parent.updated }),
        encryption: t.field({
          type: EncryptionObjectType,
          nullable: true,
          resolve: (parent) => parent.encryption,
        }),
        cors: t.field({
          type: [CorsObjectType],
          nullable: true,
          resolve: (parent) => parent.cors,
        }),
      } as never),
  });
};
