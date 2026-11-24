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

@Entity({ name: 'payroll_formula_policy' })
export class PayrollFormulaPolicyEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'payroll_formula_policy_id' })
  payroll_formula_policy_id: string;

  @Column({ type: 'uuid' }) organization_id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  formula_policy_code: string;

  @Column({ type: 'varchar', length: 50 }) policy_type: string;

  @Column({ type: 'varchar', length: 150 }) policy_name: string;

  @Column({ type: 'text' }) calculation_expression: string;

  @Column({ type: 'boolean', default: false }) is_default: boolean;

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
    if (!this.formula_policy_code) {
      this.formula_policy_code = generatePrefixedCode('PAYROLL_FORMULA_POLICY');
    }
  }
}
