import { USER_REPOSITORY } from './constants';
import { User } from '../../entities';
import { entityProviderFactory } from '../utils/entity-provider.factory';

/**
 * Provedores referentes aos repositórios de Usuário.
 * @constant
 */
export const userEntityProviders = [entityProviderFactory(USER_REPOSITORY, User)];
