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

@Entity({ name: 'payroll_sick_leave_payment_policy' })
export class PayrollSickLeavePaymentPolicyEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'payroll_sick_leave_payment_policy_id',
  })
  payroll_sick_leave_payment_policy_id: string;

  @Column({ type: 'uuid' }) organization_id: string;

  @Column({ type: 'uuid' }) legal_entity_id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  sick_leave_payment_policy_code: string;

  @Column({ type: 'varchar', length: 200 }) legal_entity_name: string;

  @Column({ type: 'varchar', length: 120, default: 'Sick Leave' })
  leave_type_name: string;

  @Column({ type: 'boolean', default: true }) is_enabled: boolean;

  @Column({ type: 'jsonb', default: [] }) salary_component_codes: string[];

  @Column({ type: 'jsonb', default: [] }) rules: Record<string, unknown>[];

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
    if (!this.sick_leave_payment_policy_code) {
      this.sick_leave_payment_policy_code = generatePrefixedCode('SLP');
    }
  }
}
