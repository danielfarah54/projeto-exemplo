import { IsEnum, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

import { Environment } from '@/common/enums/env.enum';

/**
 * Classe que representa as variáveis de ambiente do sistema.
 * Seu objetivo é validar os valores das variáveis de ambiente.
 */
export class EnvironmentVariables {
  @IsEnum(Environment)
  @IsNotEmpty()
  NODE_ENV: Environment;

  @IsNumberString()
  @IsNotEmpty()
  APP_PORT: number;

  @IsString()
  @IsNotEmpty()
  APP_URL: number;

  @IsString()
  @IsNotEmpty()
  MYSQL_DATABASE: string;

  @IsString()
  @IsNotEmpty()
  MYSQL_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  MYSQL_USER: string;

  @IsString()
  @IsNotEmpty()
  MYSQL_HOST: string;

  @IsNumberString()
  @IsNotEmpty()
  MYSQL_PORT: number;
}
