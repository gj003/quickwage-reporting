import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity({ name: 'payroll_salary_structure_component' })
export class PayrollSalaryStructureComponentEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'payroll_salary_structure_component_id',
  })
  payroll_salary_structure_component_id: string;
  @Column({ type: 'uuid' }) organization_id: string;
  @Column({ type: 'uuid' }) payroll_salary_structure_id: string;
  @Column({ type: 'uuid', nullable: true }) payroll_salary_structure_range_id?:
    string | null;
  @Column({ type: 'uuid' }) payroll_salary_component_id: string;
  @Column({ type: 'varchar', length: 100 }) section_name: string;
  @Column({ type: 'varchar', length: 20, default: 'FIXED' })
  calculation_type: string;
  @Column({ type: 'text', nullable: true }) formula_expression?: string | null;
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  fixed_amount?: string | null;
  @Column({ type: 'decimal', precision: 12, scale: 4, nullable: true })
  percentage_value?: string | null;
  @Column({ type: 'varchar', length: 100, nullable: true })
  base_component_code?: string | null;
  @Column({ type: 'boolean', default: false }) is_balance_component: boolean;
  @Column({ type: 'boolean', default: false }) is_locked: boolean;
  @Column({ type: 'boolean', default: true }) is_taxable: boolean;
  @Column({ type: 'boolean', default: true }) is_included_in_ctc: boolean;
  @Column({ type: 'boolean', default: true })
  is_recurring_every_pay_cycle: boolean;
  @Column({ type: 'boolean', default: false })
  is_included_in_arrear_calculation: boolean;
  @Column({ type: 'varchar', length: 50, default: 'active' }) status: string;
  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) updated_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) deleted_by?: string | null;
  @CreateDateColumn({ type: 'timestamptz' }) readonly created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) readonly updated_at: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  readonly deleted_at?: Date | null;
}
