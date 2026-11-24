import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity({ name: 'payroll_approval_request' })
export class PayrollApprovalRequestEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payroll_approval_request_id' })
  payroll_approval_request_id: string;
  @Column({ type: 'uuid' }) organization_id: string;
  @Column({ type: 'uuid' }) payroll_approval_workflow_id: string;
  @Column({ type: 'varchar', length: 50 }) workflow_type: string;
  @Column({ type: 'uuid', nullable: true }) reference_id?: string | null;
  @Column({ type: 'uuid', nullable: true }) payroll_run_id?: string | null;
  @Column({ type: 'int', default: 1 }) current_level: number;
  @Column({ type: 'int', nullable: true }) payroll_month?: number | null;
  @Column({ type: 'int', nullable: true }) payroll_year?: number | null;
  @Column({ type: 'varchar', length: 30, default: 'PENDING' })
  approval_status: string;
  @Column({ type: 'text', nullable: true }) comment?: string | null;
  @Column({ type: 'uuid', nullable: true }) acted_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
  @Column({ type: 'jsonb', default: [] })
  approval_history: Array<{
    level: number;
    action: string;
    action_by: string | null;
    comment?: string | null;
    action_at: string;
  }>;
  @Column({ type: 'jsonb', default: [] })
  approval_chain_snapshot: Array<{
    level_number: number;
    approver_type: string;
    user_id?: string | null;
    role_id?: string | null;
    skip_days?: number | null;
    auto_skip_enabled?: boolean;
  }>;
  @CreateDateColumn({ type: 'timestamptz' }) readonly created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) readonly updated_at: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  readonly deleted_at?: Date | null;
}
