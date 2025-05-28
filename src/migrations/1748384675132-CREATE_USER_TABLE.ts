import { MigrationInterface, QueryRunner } from 'typeorm';

export class CREATEUSERTABLE1748384675132 implements MigrationInterface {
  name = 'CREATEUSERTABLE1748384675132';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`USER\` (\`USER_SQ_USER\` varchar(36) NOT NULL, \`USER_NM_USER\` varchar(400) NOT NULL, \`USER_TX_USERNAME\` varchar(100) NOT NULL, \`USER_TX_EMAIL\` varchar(400) NOT NULL, \`USER_IN_ACTIVE\` tinyint NOT NULL DEFAULT 1, \`USER_DT_CREATED_AT\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`USER_DT_UPDATED_AT\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_42d9dc7897d35a1ab67f86ae66\` (\`USER_TX_USERNAME\`), PRIMARY KEY (\`USER_SQ_USER\`)) ENGINE=InnoDB`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_42d9dc7897d35a1ab67f86ae66\` ON \`USER\``);
    await queryRunner.query(`DROP TABLE \`USER\``);
  }
}
