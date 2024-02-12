import { FC, Fragment, useEffect } from "react";
import { Button } from "react-daisyui";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { TextField } from "@/components/Commons/TextField";
import {
  useCategoriesQuery,
  useUpdateCategoryMutation,
  useCreateCategoryMutation,
  useDeleteOneCategoryMutation,
} from "@/generated/graphql";
import { useLoading } from "@/hooks/useLoading";
import styled from "./CategorySetting.module.css";

const context = { additionalTypenames: ["Category"] };

type FormInput = {
  categories: { id: string; name: string }[];
};

interface Props {}

/**
 * CategorySetting
 *
 * @param {Props} { }
 */
export const CategorySetting: FC<Props> = ({}) => {
  const [{ data, fetching }] = useCategoriesQuery({ context });
  const { register, handleSubmit, watch, control } = useForm<FormInput>({
    defaultValues: {
      categories: [
        ...[...(data?.findManyCategory ?? [])].sort((a, b) =>
          a.name < b.name ? -1 : 1
        ),
        { id: "", name: "" },
      ],
    },
  });
  const { fields, remove, append } = useFieldArray({
    control,
    name: "categories",
  });
  const [{ fetching: mutationFetching }, updateCategory] =
    useUpdateCategoryMutation();
  const [{ fetching: mutationCreateFetching }, createCategory] =
    useCreateCategoryMutation();
  const [{ fetching: mutationDeleteFetching }, deleteCategory] =
    useDeleteOneCategoryMutation();
  const onSubmit: SubmitHandler<FormInput> = async ({ categories }) => {
    await Promise.all(
      categories.map(async ({ id, name }) => {
        if (id) {
          if (name) {
            await updateCategory({ id, name });
          } else {
            await deleteCategory({ id });
          }
        } else if (name) {
          await createCategory({ name });
        }
      })
    );
  };
  useLoading([
    fetching,
    mutationFetching,
    mutationCreateFetching,
    mutationDeleteFetching,
  ]);

  watch(({ categories }) => {
    if (categories?.[categories.length - 1]?.name) {
      append({ id: "", name: "" });
    }
  });
  useEffect(() => {
    if (data) {
      remove();
      [...data.findManyCategory]
        .sort((a, b) => (a.name < b.name ? -1 : 1))
        .forEach(({ id, name }) => append({ id, name }));
      append({ id: "", name: "" });
    }
  }, [data, append, remove]);

  if (!data) return null;

  return (
    <div className={styled.root}>
      <div className="max-w-2xl m-auto pt-8">
        <div className="grid gap-4">
          <h1>カテゴリ</h1>
          {fields.map(({ id, name }, index) => (
            <Fragment key={id}>
              <input type="hidden" {...register(`categories.${index}.id`)} />
              <TextField
                key={id}
                label={`Category ${index + 1}`}
                defaultValue={name}
                {...register(`categories.${index}.name`)}
              />
            </Fragment>
          ))}
          <Button
            onClick={handleSubmit(onSubmit)}
            aria-label="save"
            color="primary"
          >
            保存
          </Button>
        </div>
      </div>
    </div>
  );
};
