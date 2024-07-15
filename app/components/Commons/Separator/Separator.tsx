import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { Button } from "react-daisyui";
import {
  MdArrowLeft as LeftIcon,
  MdArrowRight as RightIcon,
  MdFilterCenterFocus as CenterIcon,
} from "react-icons/md";

import styled from "./Separator.module.css";
import { classNames } from "@/libs/client/classNames";

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
    <div className={classNames(styled.root, className)}>
      <div className={styled.client} style={{ flex: rato }}>
        {children[0]}
      </div>
      <div
        className={styled.separator}
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
      <div className={styled.client} style={{ flex: 1 - rato }}>
        {children[1]}
      </div>
    </div>
  );
};
