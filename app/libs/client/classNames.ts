export const classNames = (...classNames: (string | undefined | false)[]) =>
  classNames.flatMap((c) => (c ? [c] : [])).join(' ');
