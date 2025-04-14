import { FC } from "react";
import { Checkbox } from "react-daisyui";
import styled from "./Backup.module.css";
import { FieldSet } from "@/components/Commons/FieldSet";
import {
  useBackupMutation,
  useBucketQuery,
  useRestoreFilesMutation,
  useRestoreMutation,
  useUpdateCorsMutation,
} from "@/generated/graphql";
import { useFirebaseUrl } from "@/hooks/useFirebaseUrl";
import { useLoading } from "@/hooks/useLoading";
import { useNotification } from "@/hooks/useNotification";
import { arrayBufferToBase64, base64ToArrayBuffer } from "@/libs/server/buffer";

interface Props {}

/**
 * Backup
 *
 * @param {Props} { }
 */
export const Backup: FC<Props> = () => {
  const [{ data: bucketData, fetching: bucketFetching }] = useBucketQuery();
  const [{ fetching: fetchingBackup }, backup] = useBackupMutation();
  const [{ fetching }, restore] = useRestoreMutation();
  const [{ fetching: fetchingRestoreFile }, restoreFiles] =
    useRestoreFilesMutation();
  const getFirebaseUrl = useFirebaseUrl();
  const [{ fetching: mutationCorsFetching }, updateCors] =
    useUpdateCorsMutation();
  const notification = useNotification();
  const handleRestore = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        const values = JSON.parse(await file.text()) as {
          files: { id: string; binary?: string; mimeType: string }[];
        };

        const files = values.files.map(({ binary: binary, id, mimeType }) => {
          return new File([base64ToArrayBuffer(binary!)], id, {
            type: mimeType,
          });
        });
        const limit = 10;
        for (let i = 0; i < files.length; i += limit) {
          const sliceFiles = files.slice(i, i + limit);
          notification(
            `ファイルを${sliceFiles.length + i}/${files.length}件リストア中...`
          );
          const flag = await restoreFiles({ files: sliceFiles }).then(
            ({ error }) => {
              if (error) {
                notification(error.message);
                return false;
              }
              return true;
            }
          );
          if (!flag) return;
        }
        const newFile = new File(
          [
            JSON.stringify({
              ...values,

              files: values.files.map(({ binary, ...v }) => v),
            }),
          ],
          file.name,
          {
            type: file.type,
          }
        );
        restore({ file: newFile }).then(({ error }) => {
          if (error) {
            notification(error.message);
          } else {
            notification("リストアしました");
          }
        });
      }
    };
    input.click();
  };
  const handleBackup = async () => {
    backup({}).then(async (res) => {
      const values: { files: { id: string }[] } = JSON.parse(res.data!.backup);
      values.files = await Promise.all(
        values.files.map(async (v) => {
          const id = v.id;
          const url = getFirebaseUrl(id);
          const binary = await fetch(url).then(async (v) =>
            arrayBufferToBase64(await v.arrayBuffer())
          );
          return { ...v, binary };
        })
      ).catch((e) => {
        notification("バックアップに失敗しました");
        throw e;
      });
      const blob = new Blob([JSON.stringify(values)], {
        type: "application/json",
      });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `export-${new Date().toLocaleString()}.json`;
      a.click();
    });
  };
  useLoading(
    fetching ||
      fetchingBackup ||
      bucketFetching ||
      mutationCorsFetching ||
      fetchingRestoreFile
  );
  return (
    <div className={styled.root}>
      <div className="m-auto max-w-2xl pt-8">
        <h1>バックアップ/リストア</h1>
        <div className={styled.items}>
          <a className={styled.link} onClick={handleBackup}>
            バックアップ
          </a>
          <a className={styled.link} onClick={handleRestore}>
            リストア
          </a>
        </div>
        <div className="my-8 w-full border-2 border-solid" />
        <FieldSet label="CORS" className="flex gap-4 p-2">
          <Checkbox
            color="primary"
            checked={bucketData?.bucket?.cors?.[0].origin?.[0] === "*"}
            onChange={(e) => {
              updateCors({ origin: e.target.checked ? ["*"] : [] });
            }}
          />
          Firebase-storageのCORSを許可する
        </FieldSet>
      </div>
    </div>
  );
};
