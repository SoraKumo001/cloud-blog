import { useNavigate } from "@remix-run/react";
import { FC, useMemo, useState } from "react";
import { Button, Checkbox } from "react-daisyui";
import { Control, Controller } from "react-hook-form";
import {
  MdDelete as DeleteIcon,
  MdExpandLess as LessIcon,
  MdExpandMore as ExpandIcon,
  MdSave as SaveIcon,
} from "react-icons/md";
import { MessageDialog } from "@/components/Commons/Dialog/MessageDialog";
import { FieldSet } from "@/components/Commons/FieldSet";
import { ImageDragField } from "@/components/Commons/ImageDragField";
import { MultiSelect } from "@/components/Commons/MultiSelect";
import { TextField } from "@/components/Commons/TextField";
import {
  PostQuery,
  useCategoriesQuery,
  useDeleteOnePostMutation,
} from "@/generated/graphql";
import { useFirebaseUrl } from "@/hooks/useFirebaseUrl";
import { useLoading } from "@/hooks/useLoading";
import { classNames } from "@/libs/client/classNames";
import { useConvertImage } from "@/libs/client/convertImage";
import styled from "./ToolBar.module.css";
import type { FormInput } from "../Editor/Editor";
interface Props {
  post: PostQuery["findUniquePost"];
  control: Control<FormInput>;
  onCard: (card: Blob | null | undefined) => void;
}

/**
 * ToolBar
 *
 * @param {Props} { }
 */
export const ToolBar: FC<Props> = ({ post, control, onCard }) => {
  const navigate = useNavigate();
  const [{ fetching: updateFetching }, deletePost] = useDeleteOnePostMutation();
  const [isDelete, setDelete] = useState(false);
  const [{ data, fetching }] = useCategoriesQuery();
  const categoryList = useMemo(() => {
    if (!data) return undefined;
    return [...data?.findManyCategory].sort((a, b) =>
      a.name < b.name ? -1 : 1
    );
  }, [data]);
  const [isConverting, convertImage] = useConvertImage();
  const [isExpand, setExpand] = useState(false);
  const getFirebaseUrl = useFirebaseUrl();
  const url = post.cardId && getFirebaseUrl(post.cardId);
  useLoading([fetching, updateFetching, isConverting]);
  if (!categoryList) return null;
  const dateOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  } as const;
  return (
    <div className={styled.root}>
      <div className={styled.row}>
        <Button
          type="button"
          onClick={() => setExpand((v) => !v)}
          size="sm"
          variant="outline"
          aria-label="expand"
        >
          {isExpand ? <LessIcon size={24} /> : <ExpandIcon size={24} />}
        </Button>
        <Button type="submit" size="sm" variant="outline" aria-label="save">
          <SaveIcon size={24} />
        </Button>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          id="published"
          key={String(post.published)}
          defaultChecked={post.published}
          {...control.register("published")}
        />

        <TextField
          className="min-w-[300px] flex-1"
          id="postTitle"
          size="sm"
          defaultValue={post.title}
          label="Title"
          {...control.register("title")}
        />
        <Controller
          control={control}
          defaultValue={post.categories.map((v) => v.id) ?? []}
          name="categories"
          render={({ field: { onChange, ...field } }) => (
            <FieldSet label="Category">
              <MultiSelect
                className="w-64 border-none py-0"
                items={categoryList.map(({ id, name }) => (
                  <label
                    key={id}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <Checkbox
                      size="sm"
                      color="primary"
                      checked={field.value.find((n) => id === n) !== undefined}
                      onChange={(e) =>
                        onChange(
                          e.target.checked
                            ? [...field.value, e.target.value]
                            : field.value.filter(
                                (name) => name !== e.target.value
                              )
                        )
                      }
                      value={id}
                    />
                    <div>{name}</div>
                  </label>
                ))}
              >
                {field.value
                  .map((id) => categoryList.find((c) => c.id === id)?.name)
                  .join(",")}
              </MultiSelect>
            </FieldSet>
          )}
        ></Controller>
        {post.publishedAt && (
          <TextField
            type="datetime-local"
            lang="ja"
            label="PublishedAt"
            size="sm"
            defaultValue={new Date(post.publishedAt)
              .toLocaleString(undefined, dateOptions)
              .replaceAll("/", "-")}
            {...control.register("publishedAt")}
          />
        )}
        {post.updatedAt && (
          <TextField
            type="datetime-local"
            label="UpdatedAt"
            size="sm"
            defaultValue={new Date(post.updatedAt)
              .toLocaleString(undefined, dateOptions)
              .replaceAll("/", "-")}
          />
        )}
        <Button
          type="button"
          variant="outline"
          className="btn-warning"
          size="sm"
          aria-label="delete"
          onClick={() => setDelete(true)}
        >
          <DeleteIcon />
        </Button>
        <MessageDialog
          isOpen={isDelete}
          onResult={(result) => {
            if (result) {
              deletePost({ id: post.id }).then(() => {
                navigate("/");
              });
            }
            setDelete(false);
          }}
        >
          削除しますか?
        </MessageDialog>
      </div>
      <div className={classNames(styled.row, !isExpand && styled.invisible)}>
        <ImageDragField
          placeholder="Eye catch"
          onChange={(blob) => {
            if (blob)
              convertImage(blob, 256, 256).then((b) =>
                onCard(b && b.size < blob.size ? b : blob)
              );
            else onCard(null);
          }}
          url={url}
        />
      </div>
    </div>
  );
};
