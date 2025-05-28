import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as sms from 'source-map-support';

import { AppModule } from '@/app.module';
import { Environment } from '@/common/enums/env.enum';
import { RequestExceptionFilter } from '@/common/filters/request-exception.filter';
import { I18nService } from '@/common/services/i18n.service';
import { classValidatorSetup } from '@/config/class-validator/class-validator';
import { LocalStorageService } from '@/config/cls/cls.config';

sms.install({ environment: 'node' });

/**
 * Função principal para inicializar a aplicação.
 * Cria a e configura a instância da aplicação NestJS,
 */
export class Nest {
  readonly app: INestApplication;
  readonly configService: ConfigService;
  readonly logger: Logger;
  readonly environment: Environment;
  readonly appUrl: string;
  readonly appPort: number;
  readonly appHost: string;

  private serveCallbacks: Array<() => void | Promise<void>> = [];

  private constructor(readonly nestApplication: INestApplication) {
    this.app = nestApplication;
    this.configService = this.getService(ConfigService);
    this.logger = this.getLogger('Nest');
    this.environment = this.configService.getOrThrow('NODE_ENV');
    this.appPort = this.configService.getOrThrow('APP_PORT');
    this.appUrl = this.configService.getOrThrow('APP_URL');
    this.appHost = `${this.appUrl}${this.environment !== Environment.LOC ? '' : ':' + this.appPort}`;
  }

  /**
   * Configura a aplicação NestJS.
   */
  setup() {
    this.handleCors();
    this.handleClassValidator();
    this.handleGlobalFilters();

    return this;
  }

  /**
   * Habilita o CORS na aplicação.
   * @private
   */
  private handleCors() {
    this.app.enableCors({ allowedHeaders: '*', origin: '*', methods: '*' });
  }

  /**
   * Configura o ClassValidator na aplicação.
   * @private
   */
  private handleClassValidator() {
    classValidatorSetup(this.app);
  }

  /**
   * Configura os filtros globais da aplicação.
   * @private
   */
  private handleGlobalFilters() {
    const requestExceptionFilter = new RequestExceptionFilter(
      this.getService(I18nService),
      this.getService(LocalStorageService)
    );

    this.app.useGlobalFilters(requestExceptionFilter);
  }

  /**
   * Inicia a aplicação.
   */
  async serve() {
    await this.app
      .listen(this.appPort, () => {
        this.logger.log(`Ambiente: ${this.environment}`);
        this.logger.log(`Aplicação rodando em: ${this.appHost} 🔥`);
        this.serveCallbacks.forEach((callback) => {
          callback();
        });
      })
      .catch((error) => {
        this.logger.error(`Erro ao iniciar a aplicação: ${error.message}`, error.stack);
        process.exit(1);
      });

    return this;
  }

  /**
   * Retorna um serviço da aplicação.
   * @param service
   */
  getService<T>(service: new (...args: any[]) => T): T {
    return this.app.get(service);
  }

  /**
   * Cria uma instância do Logger.
   * @param name
   */
  getLogger(name: string) {
    return new Logger('Bootstrap - ' + name);
  }

  /**
   * Inicializa a aplicação.
   */
  static async ServeApp() {
    const nest = new Nest(await NestFactory.create(AppModule));
    await nest.setup();
    return nest.serve();
  }
}
