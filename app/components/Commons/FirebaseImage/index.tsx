import { Image } from "~/components/Commons/Image";
import { useFirebaseUrl } from "~/hooks/useFirebaseUrl";

export const FirebaseImage = ({
  src,
  alt,
  edit,
  width,
  height,
  ...props
}: {
  src: string;
  alt?: string;
  edit?: boolean;
  width?: number;
  height?: number;
} & React.HTMLAttributes<HTMLElement> &
  React.Attributes) => {
  const getFirebaseUrl = useFirebaseUrl();
  const isOptimize = !src.match(/https?:/);
  const url = isOptimize ? getFirebaseUrl(src) : src;

  try {
    const styleString = alt?.match(/^{.*}$/);
    const style = styleString ? JSON.parse(alt ?? "") : {};
    return edit ? (
      <img
        {...props}
        src={url}
        width={width ?? (style.width && parseInt(style.width))}
        height={height ?? (style.height && parseInt(style.height))}
        alt={alt}
      />
    ) : (
      <Image
        src={url}
        width={width ?? (style.width && parseInt(style.width))}
        height={height ?? (style.height && parseInt(style.height))}
        alt={alt}
        isOptimize={isOptimize}
      />
    );
  } catch {}
  return <img {...props} src={src} alt={alt} />;
};
