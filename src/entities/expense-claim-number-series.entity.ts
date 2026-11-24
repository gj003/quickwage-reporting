import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('expense_claim_number_series')
export class ExpenseClaimNumberSeriesEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  expense_claim_number_series_id: string;

  @Column({ type: 'uuid', unique: true })
  company_id: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  prefix?: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  suffix?: string | null;

  @Column({ type: 'int', default: 4 })
  digits_in_number: number;

  @Column({ type: 'int', default: 1 })
  next_number: number;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;
}
