import type { Root } from "mdast";
import type { Processor } from "unified";

export function compilerResultTree(this: Processor<Root, Root, Root, Root>) {
  const originalCompiler = this.compiler;
  const originalParse = this.parse;
  let mdastTree: Root | undefined;
  this.parse = function (...args) {
    const tree = originalParse.apply(this, args) as Root;
    mdastTree = tree;
    return tree;
  };
  this.compiler = (...props) => {
    return [originalCompiler?.apply(this, props), mdastTree];
  };
}
