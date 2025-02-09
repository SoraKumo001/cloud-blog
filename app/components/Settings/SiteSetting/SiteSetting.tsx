import { type FC, useState } from "react";
import { Button } from "react-daisyui";
import { type SubmitHandler, useForm } from "react-hook-form";
import { ImageDragField } from "@/components/Commons/ImageDragField";
import { TextField } from "@/components/Commons/TextField";
import {
  useCreateSystemMutation,
  useSystemQuery,
  useUpdateSystemMutation,
  useUploadSystemIconMutation,
} from "@/generated/graphql";
import { useFirebaseUrl } from "@/hooks/useFirebaseUrl";
import { useLoading } from "@/hooks/useLoading";

interface FormInput {
  title: string;
  description: string;
}

interface Props {}

/**
 * Site
 *
 * @param {Props} { }
 */
export const SiteSetting: FC<Props> = ({}) => {
  const { register, handleSubmit } = useForm<FormInput>();
  const [{ data, fetching, error }] = useSystemQuery();
  const [{ fetching: mutationFetching }, updateSystem] =
    useUpdateSystemMutation();
  const [, uploadSystemIcon] = useUploadSystemIconMutation();
  const [, createSystem] = useCreateSystemMutation();
  const [icon, setIcon] = useState<Blob | null | undefined>();
  const onSubmit: SubmitHandler<FormInput> = ({ title, description }) => {
    if (!data)
      createSystem({
        input: { id: "system", title, description },
      }).then(() => {
        if (icon) {
          uploadSystemIcon({ file: icon });
        }
      });
    else {
      updateSystem({
        title,
        description,
        icon: icon === null ? { disconnect: true } : undefined,
      });
      if (icon) {
        uploadSystemIcon({ file: icon });
      }
    }
  };
  useLoading([fetching, mutationFetching]);
  const getFirebaseUrl = useFirebaseUrl();
  if (!data && !error) return null;
  const url =
    data?.findUniqueSystem.icon?.id &&
    getFirebaseUrl(data?.findUniqueSystem.icon?.id);
  return (
    <div className="h-full overflow-y-auto">
      <div className="m-auto max-w-2xl p-8">
        <div className="grid gap-8">
          <h1 className="mb-4 border-b text-xl">サイト情報</h1>
          <TextField
            label="タイトル"
            defaultValue={data?.findUniqueSystem.title}
            {...register("title")}
          />
          <TextField
            label="説明"
            defaultValue={data?.findUniqueSystem.description}
            {...register("description")}
          />
          <ImageDragField
            placeholder="Favicon"
            types={["x-icon"]}
            onChange={setIcon}
            url={url}
          />
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
