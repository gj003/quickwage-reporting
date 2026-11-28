import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { generatePrefixedCode } from 'src/common/utility';
@Entity({ name: 'payroll_approval_workflow' })
export class PayrollApprovalWorkflowEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payroll_approval_workflow_id' })
  payroll_approval_workflow_id: string;
  @Column({ type: 'uuid' }) organization_id: string;
  @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
  approval_workflow_code?: string | null;
  @Column({ type: 'varchar', length: 50 }) workflow_type: string;
  @Column({ type: 'varchar', length: 150 }) workflow_name: string;
  @Column({ type: 'integer', nullable: true }) priority: number | null;
  @Column({ type: 'boolean', default: false }) is_fallback: boolean;
  @Column({ type: 'boolean', default: true }) is_active: boolean;
  @Column({ type: 'varchar', length: 20, default: 'ALL' })
  criteria_match_type: string;
  @Column({ type: 'jsonb', default: [] }) criteria: Record<string, unknown>[];
  @Column({ type: 'boolean', default: false })
  auto_approve_on_missing_approver: boolean;
  @Column({ type: 'varchar', length: 50, default: 'active' }) status: string;
  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) updated_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) deleted_by?: string | null;
  @CreateDateColumn({ type: 'timestamptz' }) readonly created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) readonly updated_at: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  readonly deleted_at?: Date | null;

  @BeforeInsert()
  assignCode() {
    if (!this.approval_workflow_code) {
      this.approval_workflow_code = generatePrefixedCode('PAYROLL_APPROVAL');
    }
  }
}
