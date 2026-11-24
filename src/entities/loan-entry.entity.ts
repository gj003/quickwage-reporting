// src/database/entities/loan-entry.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  Unique,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { CompanyEntity } from './company.entity';
import { LoanStatus } from 'src/common/enum';
import { SharedEntity } from './shared.entity';

@Entity('loan')
@Unique(['transaction_id'])
export class LoanEntity extends SharedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @Column({ type: 'uuid', nullable: false })
  company_id: string;

  @Column({ type: 'varchar', nullable: false })
  transaction_id: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: false })
  amount: number;

  @Column({
    type: 'varchar',
    default: LoanStatus.REPAYMENT,
  })
  transaction_type: LoanStatus;

  @Column({ type: 'varchar', nullable: true })
  drawdown_number: string;

  @Column({ nullable: true, type: 'varchar' })
  ip: string;

  @Column({ nullable: true, type: 'varchar' })
  latitude: string;

  @Column({ nullable: true, type: 'varchar' })
  longitude: string;

  // relations

  @ManyToOne(() => UserEntity, (rel) => rel.user_id)
  @JoinColumn({ name: 'user_id' }) // This is the foreign key column name
  user: UserEntity;

  @ManyToOne(() => CompanyEntity, (rel) => rel.id)
  @JoinColumn({ name: 'company_id' }) // This is the foreign key column name
  company: CompanyEntity;
}
