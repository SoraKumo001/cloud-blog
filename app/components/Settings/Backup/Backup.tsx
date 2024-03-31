import { FC } from "react";
import { Checkbox } from "react-daisyui";
import { FieldSet } from "@/components/Commons/FieldSet";
import {
  useBackupMutation,
  useBucketQuery,
  useRestoreMutation,
  useUpdateCorsMutation,
} from "@/generated/graphql";
import { useFirebaseUrl } from "@/hooks/useFirebaseUrl";
import { useLoading } from "@/hooks/useLoading";
import { useNotification } from "@/hooks/useNotification";
import { arrayBufferToBase64 } from "@/libs/server/buffer";
import styled from "./Backup.module.css";

interface Props {}

/**
 * Backup
 *
 * @param {Props} { }
 */
export const Backup: FC<Props> = () => {
  const [{ fetching: fetchingBackup }, backup] = useBackupMutation();
  const [{ fetching }, restore] = useRestoreMutation();
  const getFirebaseUrl = useFirebaseUrl();
  const [{ data: bucketData, fetching: bucketFetching }] = useBucketQuery();
  const [{ fetching: mutationCorsFetching }, updateCors] =
    useUpdateCorsMutation();
  const notification = useNotification();
  const handleRestore = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        restore({ file }).then(({ error }) => {
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
          const binary = await fetch(`${url}?`, { cache: "no-cache" }).then(
            async (v) => arrayBufferToBase64(await v.arrayBuffer())
          );
          return { ...v, binary };
        })
      );
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
    fetching || fetchingBackup || bucketFetching || mutationCorsFetching
  );
  return (
    <div className={styled.root}>
      <div className="max-w-2xl m-auto pt-8">
        <h1>バックアップ/リストア</h1>
        <div className={styled.items}>
          <a className={styled.link} onClick={handleBackup}>
            バックアップ
          </a>
          <a className={styled.link} onClick={handleRestore}>
            リストア
          </a>
        </div>
        <div className="border-2 border-solid w-full my-8" />
        <FieldSet label="CORS" className="p-2 flex gap-4">
          <Checkbox
            color="primary"
            checked={bucketData?.bucket.cors?.[0].origin?.[0] === "*"}
            onChange={(e) => {
              e.target.checked
                ? updateCors({ origin: ["*"] })
                : updateCors({ origin: [] });
            }}
          />
          Firebase-storageのCORSを許可する
        </FieldSet>
      </div>
    </div>
  );
};
