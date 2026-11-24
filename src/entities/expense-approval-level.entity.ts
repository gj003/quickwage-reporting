import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SharedEntity } from './shared.entity';

@Entity('expense_approval_levels')
export class ExpenseApprovalLevelEntity extends SharedEntity {
  @PrimaryGeneratedColumn('uuid')
  expense_approval_level_id: string;

  @Column({ type: 'uuid' })
  company_id: string;

  @Column({ type: 'uuid' })
  expense_approval_cycle_id: string;

  @Column({ type: 'int' })
  level_number: number;

  @Column({ type: 'jsonb', nullable: true })
  approver_role?: string[] | null;

  @Column({ type: 'jsonb', nullable: true })
  approver_user_ids?: string[] | null;

  @Column({ type: 'int', default: 0 })
  skip_days: number;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;
}
