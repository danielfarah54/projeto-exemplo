import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthorizationMiddleware } from './common/middlewares/authorization.middleware';
import { I18nMiddleware } from './common/middlewares/i18n.middleware';
import { LocalStorageMiddleware } from './common/middlewares/local-storage.middleware';
import { I18nService } from './common/services/i18n.service';
import { LocalStorageModule } from './config/cls/cls.config';
import { configModuleOptions } from './config/environment/env.config';
import { AppController } from './controllers/app.controller';
import { CoreModule } from './modules/core.module';
import { DatabaseModule } from './modules/database.module';
import { UserModule } from './modules/user.module';
import { AppService } from './services/app.service';

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions), CoreModule, DatabaseModule, LocalStorageModule, UserModule],
  controllers: [AppController],
  providers: [AppService, I18nService],
  exports: [I18nService],
})
export class AppModule implements NestModule {
  /**
   * Configuração de middlewares globais para todas as rotas.
   */
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LocalStorageMiddleware).forRoutes('*'); // Este middleware deve ser o primeiro a ser aplicado
    consumer.apply(I18nMiddleware).forRoutes('*'); // Este middleware deve ser aplicado após o LocalStorageMiddleware
    consumer.apply(AuthorizationMiddleware).exclude('/').forRoutes('*');
  }
}
