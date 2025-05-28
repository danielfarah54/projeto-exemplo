import { ClsStore } from 'nestjs-cls';

export interface ILocalStorageParameters extends ClsStore {
  lang: string;
  isAdmin: boolean;
  userId: string;
  username: string;
}
