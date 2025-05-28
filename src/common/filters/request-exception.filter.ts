import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';

import { RequestException } from '@/common/exceptions/request-exception.exception';
import { I18nService } from '@/common/services/i18n.service';
import { LocalStorageService } from '@/config/cls/cls.config';

/**
 * Filtro de exceção para capturar e manipular a exceção personalizada RequestException.
 */
@Catch(RequestException)
export class RequestExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly i18nService: I18nService,
    private readonly localStorageService: LocalStorageService
  ) {}

  /**
   * Captura e manipula a exceção personalizada RequestException.
   * @param exception Exceção capturada.
   * @param host Contexto da solicitação.
   */
  async catch(exception: RequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status);
    response.json({
      statusCode: status,
      requestId: this.localStorageService.getId(),
      path: request.url,
      message: (await this.i18nService.translateException(exception.message)) ?? exception.message,
      ...(exception.description ? { description: exception.description } : {}),
      ...(exception.cause ? { cause: exception.cause } : {}),
    });
  }
}
