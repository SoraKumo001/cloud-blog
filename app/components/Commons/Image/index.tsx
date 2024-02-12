import { useEnv } from "@/components/Provider/EnvProvider";

type Props = {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
};

export const Image = ({ src, width, height, alt, className }: Props) => {
  const env = useEnv();
  const url = new URL(env.NEXT_PUBLIC_IMAGE_URL);
  url.searchParams.set("url", src);
  width && url.searchParams.set("w", String(width));
  url.searchParams.set("q", "90");
  return (
    <img
      src={url.toString()}
      width={width}
      height={height}
      alt={alt}
      className={className}
    />
  );
};
