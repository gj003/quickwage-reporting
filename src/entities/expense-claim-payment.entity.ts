import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('expense_claim_payments')
export class ExpenseClaimPaymentEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  expense_claim_payment_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  expense_claim_id: string;

  @Column({ type: 'varchar', length: 40, default: 'PENDING' })
  payment_status: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  payment_mode?: string | null;

  @Column({ type: 'date', nullable: true })
  payment_date?: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  pay_cycle?: string | null;

  @Column({ type: 'text', nullable: true })
  payment_note?: string | null;
}
