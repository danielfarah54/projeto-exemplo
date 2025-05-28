import { execSync } from 'child_process';
import { log } from 'console';
import { join, resolve } from 'path';
import * as readline from 'readline';

import { Command } from 'commander';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { prompt } from 'enquirer';

import { Environment } from '@/common/enums/env.enum';

const environmentsFolder = resolve(__dirname, '../env');
const environments = Object.values(Environment);
const defaultEnvironment = Environment.LOC;
const program = new Command();

let selectedEnvironment: Environment;

process.on('SIGINT', () => process.exit());

/**
 * Este script é responsável por carregar as variáveis de ambiente conforme o ambiente selecionado.
 * É um utilitário para facilitar o desenvolvimento, deploy e testes.
 * Não deve ser usado em produção.
 */

async function selectEnvironment() {
  let timeout = 5;
  let timeoutId: string | number | NodeJS.Timeout;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  process.on('SIGINT', () => {
    clearInterval(timeoutId);
    rl.close();
    process.exit();
  });

  const response: any = await Promise.race([
    prompt({
      type: 'select',
      name: 'environment',
      message: `Selecione um ambiente !\n O ambiente padrão '${defaultEnvironment}' será selecionado em ${timeout} segundos :)`,
      choices: environments,
    }),
    new Promise((resolve) => {
      timeoutId = setInterval(() => {
        timeout--;
        if (timeout <= 0) {
          clearInterval(timeoutId);
          log('\n');
          resolve({ environment: defaultEnvironment });
        }
      }, 1000);
    }),
  ]).catch(() => {
    log('Processo interrompido!');
    process.exit(1);
  });

  clearInterval(timeoutId);
  rl.close();

  selectedEnvironment = response.environment;
  log(`Ambiente ${selectedEnvironment} selecionado!\n`);
}

function executeOnEnvironment() {
  const envPath = join(environmentsFolder, `.env.${selectedEnvironment}`);
  const args = process.argv.slice(2);

  expand(config({ path: envPath }));
  process.env.NODE_ENV = selectedEnvironment;

  if (args.length > 0) {
    try {
      execSync(args.join(' '), { stdio: 'inherit' });
      process.exit(1);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      process.exit(1);
    }
  }
}

function removeCommandAndOptionsFromArgv(commandName?: string, optionsToRemove?: string[]): void {
  const commandIndex = process.argv.indexOf(commandName);
  if (commandIndex !== -1) {
    process.argv.splice(commandIndex, 1);
  }

  if (optionsToRemove) {
    optionsToRemove.forEach((option) => {
      const optionIndex = process.argv.indexOf(option);
      if (optionIndex !== -1) {
        process.argv.splice(optionIndex, 1);
      }
    });
  }
}

program
  .allowUnknownOption()
  .option('--environment <environment>', 'Seleciona o ambiente')
  .option('--default', 'Seleciona o ambiente padrão')
  .option('--list', 'Lista os ambientes disponíveis')
  .action(async (args: any) => {
    if (args.default) {
      log(`Usando o ambiente padrão: ${defaultEnvironment}...`);
      selectedEnvironment = defaultEnvironment;
      removeCommandAndOptionsFromArgv(undefined, ['--default']);
    }
    if (args.list) {
      await selectEnvironment();
      removeCommandAndOptionsFromArgv(undefined, ['--list']);
    }
    if (args.environment) {
      selectedEnvironment = args.environment;
      removeCommandAndOptionsFromArgv(undefined, ['--environment', selectedEnvironment]);
    }

    executeOnEnvironment();
  });

log('\n');
program.parse(process.argv);
