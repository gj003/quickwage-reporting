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

@Entity({ name: 'payroll_salary_component' })
export class PayrollSalaryComponentEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payroll_salary_component_id' })
  payroll_salary_component_id: string;
  @Column({ type: 'uuid', nullable: true }) organization_id?: string | null;
  @Column({ type: 'varchar', length: 50, unique: true }) component_code: string;
  @Column({ type: 'varchar', length: 200 }) component_name: string;
  @Column({ type: 'varchar', length: 1000, nullable: true }) description?:
    string | null;
  @Column({ type: 'varchar', length: 20 }) component_frequency: string;
  @Column({ type: 'varchar', length: 30 }) component_category: string;
  @Column({ type: 'varchar', length: 30 }) component_type: string;
  @Column({ type: 'varchar', length: 100, nullable: true }) earning_section?:
    string | null;
  @Column({ type: 'varchar', length: 20, default: 'TAXABLE' })
  taxability: string;
  @Column({ type: 'varchar', length: 100, nullable: true }) exemption_section?:
    string | null;
  @Column({ type: 'boolean', default: false }) proof_required: boolean;
  @Column({ type: 'varchar', length: 30, default: 'NONE' })
  max_limit_type: string;
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  max_limit_amount?: string | null;
  @Column({ type: 'boolean', default: false }) is_system_defined: boolean;
  @Column({ type: 'boolean', default: false }) is_locked: boolean;
  @Column({ type: 'boolean', default: true }) is_active: boolean;
  @Column({ type: 'boolean', default: false }) include_in_arrears: boolean;
  @Column({ type: 'boolean', default: false })
  allow_employee_level_override: boolean;
  @Column({ type: 'boolean', default: true }) can_delete: boolean;
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
    if (!this.component_code)
      this.component_code = generatePrefixedCode('SAL_COMP');
  }
}
