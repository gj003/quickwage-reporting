import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'payroll_salary_component_tax_rule' })
export class PayrollSalaryComponentTaxRuleEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'payroll_salary_component_tax_rule_id',
  })
  payroll_salary_component_tax_rule_id: string;
  @Column({ type: 'uuid' }) organization_id: string;
  @Column({ type: 'uuid' }) payroll_salary_component_id: string;
  @Column({ type: 'varchar', length: 100 }) rule_name: string;
  @Column({ type: 'text', nullable: true }) rule_value?: string | null;
  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) updated_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) deleted_by?: string | null;
  @CreateDateColumn({ type: 'timestamptz' }) readonly created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) readonly updated_at: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  readonly deleted_at?: Date | null;
}
