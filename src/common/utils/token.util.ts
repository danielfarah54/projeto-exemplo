import { HttpStatus } from '@nestjs/common';
import { JwtPayload, decode } from 'jsonwebtoken';

import { RequestException } from '@/common/exceptions/request-exception.exception';

export function validateToken(token: string): Promise<JwtPayload> {
  let payload: JwtPayload | string;

  try {
    payload = decode(token, { complete: true })?.payload as JwtPayload | string;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    throw new RequestException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }

  if (payload && typeof payload !== 'string') return Promise.resolve(payload);

  throw new RequestException('Unauthorized', HttpStatus.UNAUTHORIZED);
}
