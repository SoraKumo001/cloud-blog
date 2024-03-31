import { InputObjectRef } from "@pothos/core";
import { BucketObject } from "firebase-storage";
import { BuilderType } from "../builder";

type NullablePartial<T> = {
  [P in keyof T]?: T[P] | null;
};

export const CorsInput = new InputObjectRef<
  NullablePartial<BucketObject["cors"][0]>
>("CorsInput");

export const createBucketObject = (
  builder: PothosSchemaTypes.SchemaBuilder<
    PothosSchemaTypes.ExtendDefaultTypes<BuilderType>
  >
) => {
  builder.inputType(CorsInput, {
    fields: (t) => ({
      origin: t.stringList({ required: false }),
      method: t.stringList({ required: false }),
      responseHeader: t.stringList({ required: false }),
      maxAgeSeconds: t.int({ required: false }),
    }),
  });
};
