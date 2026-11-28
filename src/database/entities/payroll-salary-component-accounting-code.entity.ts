import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'payroll_salary_component_accounting_code' })
export class PayrollSalaryComponentAccountingCodeEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'payroll_salary_component_accounting_code_id',
  })
  payroll_salary_component_accounting_code_id: string;
  @Column({ type: 'uuid' }) organization_id: string;
  @Column({ type: 'uuid' }) payroll_salary_component_id: string;
  @Column({ type: 'varchar', length: 10 }) transaction_type: string;
  @Column({ type: 'varchar', length: 100 }) accounting_code: string;
  @Column({ type: 'uuid', nullable: true }) created_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) updated_by?: string | null;
  @Column({ type: 'uuid', nullable: true }) deleted_by?: string | null;
  @CreateDateColumn({ type: 'timestamptz' }) readonly created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) readonly updated_at: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  readonly deleted_at?: Date | null;
}
