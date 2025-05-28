import * as fs from 'fs';
import * as path from 'path';

import { Logger } from '@nestjs/common';
import { ConfigModuleOptions } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

import { EnvironmentVariables } from '@/config/environment/env';

/**
 * Opções de configuração para o módulo de configuração (ConfigModule) do NestJS.
 */
export const configModuleOptions: ConfigModuleOptions = {
  envFilePath: getEnvFilePath(),
  expandVariables: true,
  validate,
  cache: true,
  isGlobal: true,
};

/**
 * Função para validar as configurações usando decorators de classe e validadores do class-validator.
 * @param config Objeto de configuração
 * @returns {EnvironmentVariables} configurações validadas
 * @throws Error erro é lançado se houver problemas de validação nas configurações.
 */
function validate(config: Record<string, unknown>): EnvironmentVariables {
  const validatedConfig = plainToInstance(EnvironmentVariables, config);
  const errors = validateSync(validatedConfig, { skipMissingProperties: false, whitelist: true });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

/**
 * Obtém o caminho do arquivo de configuração do ambiente.
 * @returns {string} caminho do arquivo de configuração
 * @throws Error erro é lançado se o arquivo de configuração do ambiente não for encontrado.
 */
function getEnvFilePath(): string {
  const environment = process.env.NODE_ENV;
  const logger = new Logger('Bootstrap');

  logger.log(`Ambiente: ${environment}`);

  if (!environment) throw new Error('Ambiente não definido');

  const customEnvFilePath = path.join(process.cwd(), 'env', `.env.${environment}`);
  const defaultEnvFilePath = path.join(process.cwd(), '.env');

  if (fs.existsSync(customEnvFilePath)) return customEnvFilePath;
  if (fs.existsSync(defaultEnvFilePath)) return defaultEnvFilePath;

  logger.warn(' Arquivo de configuração do ambiente não encontrado. Usando variáveis de ambiente do sistema.');

  return;
}
