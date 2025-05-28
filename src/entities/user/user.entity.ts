import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('USER')
export class User {
  @PrimaryColumn('uuid', { name: 'USER_SQ_USER' })
  @Generated('uuid')
  id: string;

  @Column('varchar', { name: 'USER_NM_USER', length: 400 })
  name: string;

  @Column('varchar', { name: 'USER_TX_USERNAME', length: 100, unique: true })
  username: string;

  @Column('varchar', { name: 'USER_TX_EMAIL', length: 400 })
  email: string;

  @Column('boolean', { name: 'USER_IN_ACTIVE', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'USER_DT_CREATED_AT', nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'USER_DT_UPDATED_AT', nullable: true })
  updatedAt?: Date;
}
