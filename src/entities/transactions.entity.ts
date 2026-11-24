// src/database/entities/transactions.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { SharedEntity } from './shared.entity';

@Entity('transactions')
@Unique(['transaction_id'])
export class TransactionEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  user_id: string; // or UUID type

  @Column({ type: 'varchar', nullable: false })
  transaction_id: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: false })
  amount: number;

  @Column({ type: 'varchar', nullable: false })
  transaction_type: string;

  @Column({
    type: 'varchar',
  })
  status: string;

  @Column({ nullable: true, type: 'varchar' })
  ip: string;

  @Column({ nullable: true, type: 'varchar' })
  latitude: string;

  @Column({ nullable: true, type: 'varchar' })
  longitude: string;

  // relations

  @OneToMany(() => UserEntity, (rel) => rel.user_id)
  @JoinColumn({ name: 'user_id' }) // This is the foreign key column name
  user: UserEntity;
}
