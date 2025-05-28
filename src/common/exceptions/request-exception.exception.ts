import { HttpException, HttpExceptionOptions } from '@nestjs/common';

/**
 * Exceção personalizada para erros de solicitação HTTP.
 * Foi criada para poder traduzir as mensagens de erro sem precisar sobrescrever o erro HTTP padrão do NestJS.
 */
export class RequestException extends HttpException {
  /**
   * Descrição adicional associada à exceção.
   */
  readonly description: string | undefined | unknown;

  /**
   * Cria uma nova instância da exceção de solicitação.
   * @param name Nome da exceção.
   * @param code Código do status HTTP.
   * @param options Opções adicionais da exceção HTTP.
   */
  constructor(name: string, code: number, options: HttpExceptionOptions = {}) {
    super(name, code, options);

    if (options.description) {
      this.description = options.description;
    } else if (options.cause) {
      this.description = options.cause;
    }
  }
}
