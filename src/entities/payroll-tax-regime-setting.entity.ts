import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity({ name: 'payroll_tax_regime_setting' })
export class PayrollTaxRegimeSettingEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payroll_tax_regime_setting_id' })
  payroll_tax_regime_setting_id: string;
  @Column({ type: 'uuid' }) organization_id: string;
  @Column({ type: 'uuid' }) payroll_pay_group_id: string;
  @Column({ type: 'varchar', length: 30, default: 'NEW' })
  default_regime: string;
  @Column({ type: 'boolean', default: true }) change_allowed: boolean;
  @Column({ type: 'int', default: 1 }) cutoff_month: number;
  @Column({ type: 'int', default: 22 }) cutoff_day: number;
  @Column({ type: 'varchar', length: 50, default: 'active' }) status: string;
  @CreateDateColumn({ type: 'timestamptz' }) readonly created_at: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) readonly updated_at: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  readonly deleted_at?: Date | null;
}
