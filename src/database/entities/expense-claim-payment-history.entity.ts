import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('expense_claim_payment_histories')
export class ExpenseClaimPaymentHistoryEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  expense_claim_payment_history_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  expense_claim_id: string;

  @Column({ type: 'varchar', length: 40 })
  from_status: string;

  @Column({ type: 'varchar', length: 40 })
  to_status: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  payment_mode?: string | null;

  @Column({ type: 'date', nullable: true })
  payment_date?: string | null;

  @Column({ type: 'text', nullable: true })
  note?: string | null;

  @Column({ type: 'uuid', nullable: true })
  action_by?: string | null;
}
