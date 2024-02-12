import type { IncomingMessage } from 'http';

export const getHost = (req?: Partial<IncomingMessage>) => {
  const headers = req?.headers;

  const host = headers?.['x-forwarded-host'] ?? headers?.['host'];
  if (!host) return undefined;
  const proto = headers?.['x-forwarded-proto']?.toString().split(',')[0] ?? 'http';
  return headers ? `${proto}://${host}` : undefined;
};
