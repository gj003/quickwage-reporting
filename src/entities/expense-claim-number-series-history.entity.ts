import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('expense_claim_number_series_history')
export class ExpenseClaimNumberSeriesHistoryEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  expense_claim_number_series_history_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  expense_claim_number_series_id: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  prefix?: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  suffix?: string | null;

  @Column({ type: 'int' })
  digits_in_number: number;

  @Column({ type: 'int' })
  next_number: number;

  @Column({ type: 'uuid', nullable: true })
  changed_by?: string | null;
}
