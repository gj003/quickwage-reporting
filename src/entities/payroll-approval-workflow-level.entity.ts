import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity({ name: 'payroll_approval_workflow_level' })
export class PayrollApprovalWorkflowLevelEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'payroll_approval_workflow_level_id',
  })
  payroll_approval_workflow_level_id: string;
  @Column({ type: 'uuid' }) organization_id: string;
  @Column({ type: 'uuid' }) payroll_approval_workflow_id: string;
  @Column({ type: 'int' }) level_number: number;
  @Column({ type: 'varchar', length: 50 }) approver_type: string;
  @Column({ type: 'uuid', nullable: true }) user_id?: string | null;
  @Column({ type: 'int', nullable: true }) role_id?: number | null;
  @Column({ type: 'uuid', nullable: true }) employee_id?: string | null;
  @Column({ type: 'int', nullable: true }) skip_days?: number | null;
  @Column({ type: 'boolean', default: false }) auto_skip_enabled: boolean;
  @Column({ type: 'uuid', nullable: true }) escalation_user_id?: string | null;
  @Column({ type: 'int', nullable: true }) escalation_role_id?: number | null;
  @Column({ type: 'varchar', length: 50, default: 'active' }) status: string;
  @CreateDateColumn({ type: 'timestamptz' }) readonly created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) readonly updated_at: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  readonly deleted_at?: Date | null;
}
