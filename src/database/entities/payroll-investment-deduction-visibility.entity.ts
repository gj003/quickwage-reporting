import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity({ name: 'payroll_investment_deduction_visibility' })
export class PayrollInvestmentDeductionVisibilityEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'payroll_investment_deduction_visibility_id',
  })
  payroll_investment_deduction_visibility_id: string;
  @Column({ type: 'uuid' }) organization_id: string;
  @Column({ type: 'uuid' }) payroll_pay_group_id: string;
  @Column({ type: 'jsonb', default: () => "'{}'" }) visibility_json: Record<
    string,
    boolean
  >;
  @Column({ type: 'varchar', length: 50, default: 'active' }) status: string;
  @CreateDateColumn({ type: 'timestamptz' }) readonly created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) readonly updated_at: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  readonly deleted_at?: Date | null;
}
