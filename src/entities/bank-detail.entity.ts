// src/database/entities/bank-detail.entity.ts

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyEntity } from './company.entity';
import { UserEntity } from './user.entity';
import { SharedEntity } from './shared.entity';

@Entity('bank-details')
export class BankDetailEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ type: 'uuid', nullable: true })
  user_id: string;

  @Column({ type: 'uuid', nullable: true })
  company_id?: string | null;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
    default: 'bank_transfer',
  })
  payment_mode?: string | null;

  @Column({ type: 'varchar', nullable: true })
  account_number: string;

  @Column({ type: 'varchar', nullable: true })
  ifsc_code: string;

  @Column({ type: 'varchar', nullable: true })
  bank_name: string;

  @Column({ type: 'varchar', nullable: true })
  branch?: string | null;

  @Column({ type: 'varchar', nullable: true })
  name_on_account?: string | null;

  @Column({ type: 'boolean', default: true })
  verifed: boolean;

  @Column({ type: 'varchar', length: 20, nullable: true, default: 'pending' })
  verification_status?: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  verified_at?: Date | null;

  @OneToOne(() => UserEntity, (rel) => rel.user_id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => CompanyEntity, (rel) => rel.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;
}
