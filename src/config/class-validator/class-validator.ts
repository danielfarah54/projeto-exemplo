import { INestApplication, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';

/**
 * Configuração global para validação de classes usando decorators.
 * @param app Instância da aplicação NestJS.
 */
export const classValidatorSetup = (app: INestApplication) => {
  const options: ValidationPipeOptions = {
    whitelist: true,
    forbidNonWhitelisted: true,
    validateCustomDecorators: false,
  };

  app.useGlobalPipes(new ValidationPipe(options));
};
