import {
  OnMount,
  Editor as MonacoEditor,
  useMonaco,
} from "@monaco-editor/react";
import {
  DOMAttributes,
  FC,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdModeStandby as ModeStandbyIcon } from "react-icons/md";
import {
  usePostQuery,
  useUpdatePostMutation,
  useUploadPostIconMutation,
  useUploadPostImageMutation,
} from "@/generated/graphql";
import { useLoading } from "@/hooks/useLoading";
import { useMarkdown } from "@/hooks/useMarkdown";
import { useNotification } from "@/hooks/useNotification";
import { getImageSize, useConvertImage } from "@/libs/client/convertImage";
import styled from "./Editor.module.css";
import { Separator } from "../../Commons/Separator";
import { ContentMarkdown } from "../../ContentMarkdown";
import { ToolBar } from "../ToolBar";
import type { editor } from "monaco-editor";

export type FormInput = {
  categories: string[];
  title: string;
  published: boolean;
  publishedAt: Date;
  card?: Blob | null;
};

interface Props {
  id: string;
}

/**
 * Editor
 *
 * @param {Props} { }
 */
export const Editor: FC<Props> = ({ id }) => {
  const [currentTop, setCurrentTop] = useState(0);
  const [{ fetching: uploadFeting }, uploadFile] = useUploadPostImageMutation();
  const [{ fetching: uploadCardFeting }, uploadPostIcon] =
    useUploadPostIconMutation();
  const monaco = useMonaco();
  const refEditor = useRef<editor.IStandaloneCodeEditor>();
  const refMarkdown = useRef<HTMLDivElement>(null);
  const [currentLine, setCurrentLine] = useState(1);
  const [card, setCard] = useState<Blob | null | undefined>();
  const { control, handleSubmit } = useForm<FormInput>();
  const [isConverting, convertImage] = useConvertImage();

  const handleEditorDidMount: OnMount = (editor) => {
    refEditor.current = editor;
    editor.onDidChangeCursorPosition((event) => {
      const currentLine = event.position.lineNumber;
      setCurrentLine(currentLine);
      const top = editor.getScrollTop();
      const linePos = editor.getTopForLineNumber(currentLine);
      const node = refMarkdown.current;
      if (currentLine && node) {
        const nodes = node.querySelectorAll<HTMLElement>("[data-sourcepos]");
        const target = Array.from(nodes).find((node) => {
          const nodeLine = node.dataset.sourcepos?.match(/(\d+)/)?.[1];
          if (!nodeLine) return false;
          return currentLine === Number(nodeLine);
        });
        if (target) {
          const { top: targetTop } = target.getBoundingClientRect();
          const { top: nodeTop } = node.getBoundingClientRect();
          node.scrollTop =
            targetTop - nodeTop + node.scrollTop - (linePos - top);
        }
      }
    });
  };
  const handleUpload = (file: File) => {
    const editor = refEditor.current;
    const p = editor?.getPosition();
    if (editor && monaco && p) {
      convertImage(file).then((value) => {
        if (!value) throw "convert error";
        uploadFile({ postId: id, file: value }).then(async (v) => {
          const size = await getImageSize(value);
          editor.executeEdits("", [
            {
              range: new monaco.Range(
                p.lineNumber,
                p.column,
                p.lineNumber,
                p.column
              ),
              text: `![{"width":"${size.width}px","height":"${size.height}px"}](${v.data?.uploadPostImage.id})`,
            },
          ]);
        });
      });
    }
  };
  const handleDrop: DOMAttributes<HTMLDivElement>["onDropCapture"] = (
    event
  ) => {
    event.stopPropagation();
    event.preventDefault();
    const editor = refEditor.current;
    if (editor && monaco) {
      const p = editor.getTargetAtClientPoint(
        event.clientX,
        event.clientY
      )?.position;
      if (p) {
        const file = event.dataTransfer.files[0];
        if (file.type.startsWith("image/")) {
          convertImage(file).then((value) => {
            if (!value) throw "convert error";
            uploadFile({ postId: id, file: value }).then(async (v) => {
              const size = await getImageSize(value);
              editor.executeEdits("", [
                {
                  range: new monaco.Range(
                    p.lineNumber,
                    p.column,
                    p.lineNumber,
                    p.column
                  ),
                  text: `![{"width":"${size.width}px","height":"${size.height}px"}](${v.data?.uploadPostImage.id})`,
                },
              ]);
            });
          });
        }
      }
    }
  };

  const handleDragOver: DOMAttributes<HTMLDivElement>["onDragOver"] = (
    event
  ) => {
    event.preventDefault();
  };
  const sendNotification = useNotification();
  useEffect(() => {
    setTimeout(() => {
      const node = refMarkdown.current;
      if (currentLine && node) {
        const nodes = node.querySelectorAll<HTMLElement>("[data-sourcepos]");
        const target = Array.from(nodes).find((node) => {
          const v = node.dataset.sourcepos?.match(/(\d+)/);
          const nodeLine = v?.[1];
          if (!nodeLine) return false;
          return currentLine === Number(nodeLine);
        });
        if (target) {
          const targetRect = target.getBoundingClientRect();
          const nodeRect = node.getBoundingClientRect();
          setCurrentTop(targetRect.top - nodeRect.top + node.scrollTop);
        }
      }
    }, 1);
  }, [currentLine]);

  const onSubmit: SubmitHandler<FormInput> = ({
    title,
    categories,
    published,
    publishedAt,
  }) => {
    Promise.all([
      updatePost({
        postId: id,
        title,
        content,
        published,
        categories: categories.map((id) => ({ id })),
        publishedAt: new Date(publishedAt).toISOString(),
      }),
      (card !== undefined && uploadPostIcon({ postId: id, file: card })) || {},
    ]).then((result) => {
      const isError = result.some((v) => "error" in v && v.error);
      sendNotification(isError ? "Error" : "Update Post Success");
    });
  };

  const [{ fetching, data }] = usePostQuery({ variables: { postId: id } });
  const [{ fetching: updateFetching }, updatePost] = useUpdatePostMutation();
  const [content, setContent] = useState<string>();
  const [, update] = useTransition();
  const post = data?.findUniquePost;
  useLoading([
    fetching,
    updateFetching,
    uploadCardFeting,
    uploadFeting,
    isConverting,
  ]);
  const [children] = useMarkdown(content ?? data?.findUniquePost.content, true);
  if (fetching || !post) return null;
  return (
    <form className={styled.root} onSubmit={handleSubmit(onSubmit)}>
      <ToolBar post={post} control={control} onCard={setCard} />
      <div className={styled.body}>
        <Separator>
          <div
            className="h-full"
            onKeyDown={(e) => {
              if (e.ctrlKey && e.key === "s") {
                e.preventDefault();
                handleSubmit(onSubmit)();
              }
            }}
            onDropCapture={handleDrop}
            onDragOver={handleDragOver}
            onPasteCapture={(e) => {
              Array.from(e.clipboardData.files).forEach((item) => {
                if (item.type.startsWith("image/")) {
                  e.preventDefault();
                  e.stopPropagation();
                  handleUpload(item);
                }
              });
            }}
          >
            <MonacoEditor
              language="markdown"
              defaultValue={content ?? post.content}
              onChange={(e) => update(() => setContent(e ?? ""))}
              onMount={handleEditorDidMount}
              options={{
                renderControlCharacters: true,
                renderWhitespace: "boundary",
                automaticLayout: true,
                scrollBeyondLastLine: false,
                wordWrap: "on",
                wrappingStrategy: "advanced",
                minimap: { enabled: false },
                dragAndDrop: true,
                dropIntoEditor: { enabled: true },
                contextmenu: false,
                occurrencesHighlight: false as never,
                renderLineHighlight: "none",
                quickSuggestions: false,
                wordBasedSuggestions: "off",
                language: "markdown",
              }}
            />
          </div>
          <div
            ref={refMarkdown}
            className="relative h-full overflow-y-auto px-4"
          >
            {currentLine && (
              <ModeStandbyIcon
                className="absolute text-red-400"
                style={{ top: `${currentTop}px` }}
              />
            )}
            <ContentMarkdown
              onClick={(line, offset) => {
                const editor = refEditor.current;
                const node = refMarkdown.current;
                if (editor && node) {
                  const linePos = editor.getTopForLineNumber(line);
                  editor.setScrollTop(linePos - offset + node.scrollTop);
                  editor.setPosition({ lineNumber: line, column: 1 });
                }
              }}
            >
              {children}
            </ContentMarkdown>
          </div>
        </Separator>
      </div>
    </form>
  );
};
