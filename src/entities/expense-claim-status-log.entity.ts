import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('expense_claim_status_logs')
export class ExpenseClaimStatusLogEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  expense_claim_status_log_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  expense_claim_id: string;

  @Column({ type: 'varchar', length: 40 })
  from_status: string;

  @Column({ type: 'varchar', length: 40 })
  to_status: string;

  @Column({ type: 'uuid', nullable: true })
  action_by?: string | null;

  @Column({ type: 'text', nullable: true })
  remarks?: string | null;
}
