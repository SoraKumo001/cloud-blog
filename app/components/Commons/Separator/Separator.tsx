import { useEffect, useRef, useState } from "react";
import { Button } from "react-daisyui";
import {
  MdArrowLeft as LeftIcon,
  MdArrowRight as RightIcon,
  MdFilterCenterFocus as CenterIcon,
} from "react-icons/md";

import type { FC, ReactNode } from "react";
import { classNames } from "~/libs/client/classNames";

interface Props {
  className?: string;
  children: [ReactNode, ReactNode];
}

/**
 * Separator
 *
 * @param {Props} { }
 */
export const Separator: FC<Props> = ({ className, children }) => {
  const [rato, setRato] = useState(0.5);
  const refSeparator = useRef<HTMLDivElement>(null);
  const property = useRef({ isDrag: false, x: 0 }).current;
  useEffect(() => {
    const handleMouseUp = () => {
      property.isDrag = false;
    };
    const handleMouseMove = (e: MouseEvent) => {
      const node = refSeparator.current;
      const parent = node?.parentElement;
      if (property.isDrag && node && parent) {
        const x = e.pageX - parent.getBoundingClientRect().left - property.x;
        const width = x / (parent.clientWidth - node.clientWidth);
        setRato(width);
      }
    };
    addEventListener("mouseup", handleMouseUp);
    addEventListener("mousemove", handleMouseMove);
    return () => {
      removeEventListener("mouseup", handleMouseUp);
      removeEventListener("mousemove", handleMouseMove);
    };
  }, [property]);
  return (
    <div className={classNames("flex h-full w-full border", className)}>
      <div className="h-full overflow-hidden" style={{ flex: rato }}>
        {children[0]}
      </div>
      <div
        className="flex h-full w-3 cursor-ew-resize flex-col items-center gap-y-2 overflow-hidden bg-slate-300 pt-4"
        ref={refSeparator}
        onMouseDown={(e) => {
          property.isDrag = true;
          property.x = e.pageX - e.currentTarget.getBoundingClientRect().left;
          e.preventDefault();
        }}
      >
        <Button
          type="button"
          variant="outline"
          onClick={(e) => {
            setRato(0);
            e.preventDefault();
          }}
          aria-label="left"
        >
          <LeftIcon className="w-6" />
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={(e) => {
            setRato(0.5);
            e.preventDefault();
          }}
          aria-label="center"
        >
          <CenterIcon className="w-6" />
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={(e) => {
            setRato(1);
            e.preventDefault();
          }}
          aria-label="right"
        >
          <RightIcon className="w-6" />
        </Button>
      </div>
      <div className="h-full overflow-hidden" style={{ flex: 1 - rato }}>
        {children[1]}
      </div>
    </div>
  );
};
