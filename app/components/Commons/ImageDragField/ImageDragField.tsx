import { type FC, type ReactNode, useRef, useState } from "react";
import { Button } from "react-daisyui";
import { MdClose as CloseIcon } from "react-icons/md";
import { FieldSet } from "../FieldSet";
import { classNames } from "@/libs/client/classNames";
import { arrayBufferToBase64 } from "@/libs/server/buffer";

interface Props {
  className?: string;
  children?: ReactNode;
  types?: ("png" | "jpeg" | "x-icon" | "webp")[];
  placeholder?: string;
  url?: string | null;
  onChange?: (value: Blob | null) => void;
}

/**
 * DragArea
 *
 * @param {Props} { }
 */
export const ImageDragField: FC<Props> = ({
  className,
  placeholder,
  types = ["png", "jpeg", "x-icon", "webp"],
  onChange,
  url,
}) => {
  const [isDrag, setDrag] = useState(false);
  const [image, setImage] = useState(url);
  const [active, setActive] = useState(false);
  const refInput = useRef<HTMLInputElement>(null);
  return (
    <FieldSet
      className={classNames(
        "relative",
        "min-h-[64px] p-4",
        isDrag && "border-gray-700",
        className,
        active && "ring-1 ring-offset-4"
      )}
      label={placeholder}
      onDragOver={(e) => {
        setDrag(true);
        e.preventDefault();
      }}
      onDragLeave={() => {
        setDrag(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
          const type = file.type.split("/")[1];
          if (!type || !types.includes(type as (typeof types)[number])) return;
          convertUrl(file, type).then(setImage);
          onChange?.(file);
        }
      }}
      onClick={(e) => {
        refInput.current?.focus();
        e.preventDefault();
      }}
    >
      <input
        ref={refInput}
        className="absolute size-0"
        autoFocus
        onFocus={() => {
          setActive(true);
        }}
        onBlur={() => {
          setActive(false);
        }}
        onPaste={(e) => {
          Array.from(e.clipboardData.files).forEach((file) => {
            const type = file.type.split("/")[1];
            if (!type || !types.includes(type as (typeof types)[number]))
              return;
            e.preventDefault();
            e.stopPropagation();
            convertUrl(file, type).then(setImage);
            onChange?.(file);
          });
        }}
      />
      {image && (
        <Button
          type="button"
          variant="link"
          className={"absolute top-6 right-6 border-gray-400 bg-white/50 p-2"}
          onClick={() => {
            onChange?.(null);
            setImage(undefined);
          }}
          aria-label="close"
        >
          <CloseIcon size={24} />
        </Button>
      )}
      {image && (
        <img
          className={"m-auto max-h-64 max-w-64"}
          src={image}
          alt={placeholder || ""}
        />
      )}
    </FieldSet>
  );
};

const convertUrl = async (blob: Blob | undefined | null, type: string) => {
  if (!blob) return undefined;
  return (
    `data:image/${type};base64,` + arrayBufferToBase64(await blob.arrayBuffer())
  );
};
