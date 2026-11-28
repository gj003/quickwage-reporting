import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('expense_payment_cycle_change_logs')
export class ExpensePaymentCycleChangeLogEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  expense_payment_cycle_change_log_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  expense_claim_id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  from_pay_cycle?: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  to_pay_cycle?: string | null;

  @Column({ type: 'date', nullable: true })
  from_payment_date?: string | null;

  @Column({ type: 'date', nullable: true })
  to_payment_date?: string | null;

  @Column({ type: 'uuid', nullable: true })
  changed_by?: string | null;

  @Column({ type: 'text', nullable: true })
  note?: string | null;
}
