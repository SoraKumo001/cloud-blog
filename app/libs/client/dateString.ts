export const DateString = (value: string) =>
  new Date(value).toLocaleString('ja', {
    timeZone: 'asia/tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
