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
import { PayGroupFrequency } from 'src/modules/payroll-settings/dto/payroll.enums';

@Entity({ name: 'payroll_pay_group' })
export class PayrollPayGroupEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payroll_pay_group_id' })
  payroll_pay_group_id: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  pay_group_code: string;

  @Column({ type: 'uuid' })
  legal_entity_id: string;

  @Column({ type: 'varchar', length: 200 })
  legal_entity_name: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  country_code?: string | null;

  @Column({ type: 'int', nullable: true })
  financial_year_start_month?: number | null;

  @Column({ type: 'int', nullable: true })
  financial_year_end_month?: number | null;

  @Column({ type: 'varchar', length: 100 })
  payroll_provider: string;

  @Column({ type: 'varchar', length: 200 })
  pay_group_name: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  description?: string | null;

  @Column({ type: 'varchar', length: 50 })
  pay_frequency: PayGroupFrequency;

  @Column({ type: 'varchar', length: 10, nullable: true })
  currency_code?: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  currency_name?: string | null;

  @Column({ type: 'boolean', default: false })
  is_default: boolean;

  @Column({ type: 'varchar', length: 50, default: 'active' })
  status: string;

  @Column({ type: 'varchar', length: 50, default: 'draft' })
  setup_status: string;

  @Column({ type: 'timestamptz', nullable: true })
  last_payroll_run_at?: Date | null;

  @Column({ type: 'uuid', nullable: true })
  created_by?: string | null;

  @Column({ type: 'uuid', nullable: true })
  updated_by?: string | null;

  @Column({ type: 'uuid', nullable: true })
  deleted_by?: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  readonly created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  readonly updated_at: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  readonly deleted_at?: Date | null;

  @BeforeInsert()
  assignCode() {
    if (!this.pay_group_code)
      this.pay_group_code = generatePrefixedCode('PAY_GROUP');
  }
}
