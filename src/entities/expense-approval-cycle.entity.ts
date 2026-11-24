import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('expense_approval_cycles')
export class ExpenseApprovalCycleEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  expense_approval_cycle_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  expense_policy_id: string;

  @Column({ type: 'varchar', length: 120 })
  cycle_name: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;
}
