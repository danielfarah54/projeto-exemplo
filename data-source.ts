import { DataSource } from 'typeorm';

import * as entities from './src/entities';

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities,
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});

export default dataSource;
