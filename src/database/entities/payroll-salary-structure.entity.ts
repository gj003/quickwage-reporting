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

@Entity({ name: 'payroll_salary_structure' })
export class PayrollSalaryStructureEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payroll_salary_structure_id' })
  payroll_salary_structure_id: string;
  @Column({ type: 'uuid' }) organization_id: string;
  @Column({ type: 'uuid' }) payroll_pay_group_id: string;
  @Column({ type: 'varchar', length: 50, unique: true }) structure_code: string;
  @Column({ type: 'varchar', length: 20 }) remuneration_type: string;
  @Column({ type: 'boolean', default: false }) is_default: boolean;
  @Column({ type: 'varchar', length: 200 }) structure_name: string;
  @Column({ type: 'varchar', length: 1000, nullable: true }) description?:
    string | null;
  @Column({ type: 'boolean', default: false })
  is_flexible_benefit_plan: boolean;
  @Column({ type: 'boolean', default: false }) is_pf_enabled: boolean;
  @Column({ type: 'boolean', default: false }) is_esi_enabled: boolean;
  @Column({ type: 'boolean', default: false }) is_tds_enabled: boolean;
  @Column({ type: 'varchar', length: 30, nullable: true })
  tds_deduction_type?: string | null;
  @Column({ type: 'text', nullable: true }) tds_formula?: string | null;
  @Column({ type: 'varchar', length: 50, default: 'active' }) status: string;
  @Column({ type: 'int', default: 1 }) version_number: number;
  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) updated_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) deleted_by?: string | null;
  @CreateDateColumn({ type: 'timestamptz' }) readonly created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) readonly updated_at: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  readonly deleted_at?: Date | null;
  @BeforeInsert() assignCode() {
    if (!this.structure_code)
      this.structure_code = generatePrefixedCode('SAL_STRUCTURE');
  }
}
