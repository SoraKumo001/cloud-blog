import rehypeRaw from "rehype-raw";
import rehypeReact from "rehype-react";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified, type Processor } from "unified";
import { compilerResultTree } from "./plugins/compilerResultTree";
import { rehypeAddLineNumber } from "./plugins/rehypeAddLineNumber";
import { rehypeAddTargetBlank } from "./plugins/rehypeAddTargetBlank";
import { rehypeReactOptions } from "./plugins/rehypeReactOptions";
import { remarkCode } from "./plugins/remarkCode";
import { remarkDepth } from "./plugins/remarkDepth";
import { remarkEmptyParagraphs } from "./plugins/remarkEmptyParagraphs";
import { remarkHeadingId } from "./plugins/remarkHeadingId";
import type { Root } from "mdast";
import type { ReactNode } from "react";

export const markdownCompiler: Processor<
  undefined,
  undefined,
  undefined,
  undefined,
  [ReactNode, Root]
> = unified()
  // ASTの作成
  .use(remarkParse)
  // 表やテキスト中のリンクなど変換を追加
  .use(remarkGfm)
  // 段落内の改行を有効に
  .use(remarkBreaks)
  // 空行を復元
  .use(remarkEmptyParagraphs)
  // ヘッダにIDとリンクを付ける
  .use(remarkHeadingId)
  // コードブロックに追加情報を加える
  .use(remarkCode)
  // ノードに対してヘッダーに対応するインデント用の深度情報を与える
  .use(remarkDepth)
  // HAST(HTML用のASTに変換)
  .use(remarkRehype, {
    allowDangerousHtml: true,
  })
  // ノードに対して行番号情報を付与
  .use(rehypeAddLineNumber)
  // 埋め込みHTMLを有効にする
  .use(rehypeRaw)
  // aタグにtarget="_blank"を設定
  .use(rehypeAddTargetBlank)
  // Reactコンポーネントに変換
  .use(rehypeReact, rehypeReactOptions)
  // 出力情報を[Reactコンポーネント,MdastTree]の形式に変換
  .use(compilerResultTree);
