// src/database/entities/accounts.entity.ts

// @important: Sync with Quickwage-webapp
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { SharedEntity } from './shared.entity';

@Entity('accounts')
export class AccountEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: false })
  account_balance: number;

  @Column({ type: 'varchar', nullable: true })
  status: string;

  @ManyToOne(() => UserEntity, (rel) => rel.user_id)
  @JoinColumn({ name: 'user_id' }) // This is the foreign key column name
  user: UserEntity;
}
