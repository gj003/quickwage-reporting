import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('expense_claim_approval_logs')
export class ExpenseClaimApprovalLogEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  expense_claim_approval_log_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  expense_claim_id: string;

  @Column({ type: 'uuid', nullable: true })
  expense_approval_cycle_id?: string | null;

  @Column({ type: 'uuid', nullable: true })
  expense_approval_level_id?: string | null;

  @Column({ type: 'int', default: 0 })
  level_number: number;

  @Column({ type: 'uuid' })
  approver_user_id: string;

  @Column({ type: 'varchar', length: 40 })
  action: string;

  @Column({ type: 'text', nullable: true })
  remarks?: string | null;
}
